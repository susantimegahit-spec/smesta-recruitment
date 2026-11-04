import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './disc.css';
import './disc-intro.css';
import './disc-navigator.css';
import './disc-font.css';
import './mdt.css';
import './biodata.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
