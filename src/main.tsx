import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { AuthProvider } from './auth/AuthContext';
import './index.css';

const container = document.getElementById('root')!;

const app = (
  <BrowserRouter>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </BrowserRouter>
);

if (container.hasChildNodes()) {
  // Pre-rendered HTML exists (react-snap), hydrate it
  hydrateRoot(container, app);
} else {
  // Development mode or first load, render from scratch
  createRoot(container).render(app);
}
