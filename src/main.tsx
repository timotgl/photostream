import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';
import config from './config';

import './global.css';

const requiredPathname = `${config.VITE_PUBLIC_URL}/`;
const isCurrentUrlCorrect =
  window.location.pathname.indexOf(requiredPathname) >= 0;

if (process.env.NODE_ENV === 'development' && !isCurrentUrlCorrect) {
  // Ensure that the current URL matches VITE_PUBLIC_URL
  // @ts-expect-error TS doesn't know that this works...
  window.location = requiredPathname as unknown as Location;
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
