import React from 'react';
import ReactDOM from 'react-dom';
import './front-end/index.css';
import App from './front-end/App';
import registerServiceWorker from './front-end/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
