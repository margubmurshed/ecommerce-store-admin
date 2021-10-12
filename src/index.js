import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MaterialTheme from './MaterialUI-theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReduxStore } from './Redux/Store';

ReactDOM.render(
    <MaterialTheme>
        <Provider store={ReduxStore}>
            <Router>
                <App />
            </Router>
        </Provider>
    </MaterialTheme>
    , document.getElementById('root')
);
reportWebVitals();
