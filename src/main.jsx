import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ProductProvider } from './context/ProductContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faHouse, 
  faBox, 
  faUsers, 
  faChartBar, 
  faGear,
  faUser,
  faExclamationTriangle,
  faHourglassHalf,
  faCheck,
  faSearch,
  faFilter,
  faPlus,
  faFileAlt,
  faCheckCircle,
  faUserTie,
  faClipboardCheck,
  faBoxOpen,
  faPeopleGroup,
  faCalendarDays,
  faClock
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faHouse, faBox, faUsers, faChartBar, faGear, faUser,
  faExclamationTriangle, faHourglassHalf, faCheck, faSearch,
  faFilter, faPlus, faFileAlt, faCheckCircle, faUserTie,
  faClipboardCheck, faBoxOpen, faPeopleGroup, faCalendarDays,
  faClock
);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductProvider>
  </StrictMode>
);
