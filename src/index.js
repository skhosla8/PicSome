import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { ContextProvider } from './contexts/Context';
import './index.css';
import ScrollToTop from './components/ScrollToTop';
import App from './App';

ReactDOM.render(
    <ContextProvider>
        <Router basename={process.env.PUBLIC_URL}>
            <ScrollToTop />
            <App />
        </Router>
    </ContextProvider>,
    document.getElementById('root')
);
