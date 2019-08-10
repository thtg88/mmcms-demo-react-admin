// For IE 9-11 support
import 'react-app-polyfill/ie9';
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

function render(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <HelmetProvider>
                <Component />
            </HelmetProvider>
        </Provider>,
        document.getElementById('root')
    );
}

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
