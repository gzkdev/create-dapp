import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WalletsProvider } from './providers/wallets';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletsProvider>
      <App />
    </WalletsProvider>
  </StrictMode>,
);
