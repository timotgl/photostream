import { useEffect, useState } from 'react';
import config from '../config';

const NAVIGATION_HELP_SEEN_KEY = 'navigationHelpSeen';

export const useNavigationHelpState = () => {
  const [isNavigationHelpVisible, setIsNavigationHelpVisible] = useState(false);
  const [fadeInDelay, setFadeInDelay] = useState(0);

  useEffect(() => {
    // Check if user has seen navigation help before in this session
    const hasSeenHelp = sessionStorage.getItem(NAVIGATION_HELP_SEEN_KEY);

    if (!hasSeenHelp) {
      // Navigation help will be shown
      setIsNavigationHelpVisible(true);
      setFadeInDelay(config.FADE_IN_DURATION); // Wait for navigation help to fade out
    } else {
      // Navigation help won't be shown
      setIsNavigationHelpVisible(false);
      setFadeInDelay(0); // Show immediately
    }
  }, []);

  return {
    isNavigationHelpVisible,
    fadeInDelay,
  };
};
