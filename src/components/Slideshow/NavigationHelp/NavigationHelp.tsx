import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './NavigationHelp.css';

type Props = {
  hideAfter: number;
};

const NavigationHelp = ({ hideAfter }: Props) => {
  const { t } = useTranslation();
  const [className, setClassName] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setClassName('fadeOut');
    }, hideAfter);
  }, [hideAfter]);
  return (
    <div id="navigationHelp" className={className}>
      <h1>{t('NavigationHelp.instructions')}</h1>
    </div>
  );
};

export default NavigationHelp;
