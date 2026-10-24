import {StrictMode, Suspense, lazy} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Analytics } from '@vercel/analytics/react';

const Templates = lazy(() => import('./pages/Templates.tsx'));
const isTemplates = window.location.pathname.replace(/\/$/, '') === '/templates';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isTemplates ? <Suspense fallback={null}><Templates /></Suspense> : <App />}
    <Analytics />
  </StrictMode>,
);
