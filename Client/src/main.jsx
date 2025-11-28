import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Bootstrap global styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Optional: Bootstrap JS (includes Popper) for components like modal, dropdown, tooltip, etc.
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Boostrap Icon CDN
 import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
