import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/App.css';
import './assets/Reset.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App/>, document.getElementById('root'));
registerServiceWorker();
