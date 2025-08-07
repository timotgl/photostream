import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import config from '../../../config';
import './NavigationHelp.css';

const NAVIGATION_HELP_SEEN_KEY = 'navigationHelpSeen';

const NavigationHelp = () => {
  const { t } = useTranslation();
  const [className, setClassName] = useState('');
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if user has seen navigation help before in this session
    const hasSeenHelp = sessionStorage.getItem(NAVIGATION_HELP_SEEN_KEY);

    if (!hasSeenHelp) {
      setShouldShow(true);
      // Mark as seen in session storage
      sessionStorage.setItem(NAVIGATION_HELP_SEEN_KEY, 'true');

      // Set up fade out timer
      setTimeout(() => {
        setClassName('fadeOut');
      }, config.FADE_IN_DURATION);
    }
  }, []);

  if (!shouldShow) {
    return null;
  }

  return (
    <div id="navigationHelp" className={className}>
      <h1>{t('NavigationHelp.instructions')}</h1>
    </div>
  );
};

export default NavigationHelp;
