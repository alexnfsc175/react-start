import React from 'react';
import ReactDOM from 'react-dom';
/*eslint-disable no-unused-vars*/
import bootstrap from './include/bootstrap';
/*eslint-disable no-unused-vars*/
import './index.scss';

import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App/>, document.getElementById('root'));
registerServiceWorker();