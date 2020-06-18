import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

const AppWithRouter = () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

ReactDOM.render(<AppWithRouter />, document.getElementById('root'));
//registerServiceWorker();
