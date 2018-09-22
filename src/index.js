import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import store from './redux/store';
import './index.css';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

function render(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        document.getElementById('root')
    );
}

render(App);

if(module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    })
}


// disable ServiceWorker
// registerServiceWorker();
