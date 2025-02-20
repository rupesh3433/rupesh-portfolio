import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./components/Home/Home.css";
import "./components/About/About.css";
import "./components/Projects/Projects.css";
import "./components/Contact/Contact.css";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
