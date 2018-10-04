import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { init } from '@sentry/browser';
import 'react-toastify/dist/ReactToastify.min.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'
import './App.css';
// Containers
import { DefaultLayout } from './containers';
import ErrorBoundary from './ErrorBoundary';
import GuestComponent from './containers/DefaultLayout/GuestComponent';
// Pages
import { Login, Register } from './views/Pages';

class App extends Component {
    componentDidMount() {
        const {
            NODE_ENV,
            REACT_APP_SENTRY_KEY,
            REACT_APP_SENTRY_PROJECT_ID
        } = process.env;
        if(
            NODE_ENV === 'production'
            && typeof REACT_APP_SENTRY_KEY !== 'undefined'
            && REACT_APP_SENTRY_KEY !== null
            && REACT_APP_SENTRY_KEY !== ''
            && typeof REACT_APP_SENTRY_PROJECT_ID !== 'undefined'
            && REACT_APP_SENTRY_PROJECT_ID !== null
            && REACT_APP_SENTRY_PROJECT_ID !== ''
        ) {
            // Initialize Sentry error tracking
            init({
                dsn: `https://${REACT_APP_SENTRY_KEY}@sentry.io/${REACT_APP_SENTRY_PROJECT_ID}`
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" name="Login Page" render={(props) => (
                            <ErrorBoundary>
                                <GuestComponent>
                                    <Login {...props} />
                                </GuestComponent>
                            </ErrorBoundary>
                        )} />
                        <Route exact path="/register" name="Register Page" render={(props) => (
                            <ErrorBoundary>
                                <GuestComponent>
                                    <Register {...props} />
                                </GuestComponent>
                            </ErrorBoundary>
                        )} />
                        <Route path="/" name="Home" component={DefaultLayout} />
                    </Switch>
                </BrowserRouter>
                <ToastContainer
                    hideProgressBar
                    autoClose={false}
                    bodyClassName="color-black"
                />
            </React.Fragment>
        );
    }
}
export default App;
