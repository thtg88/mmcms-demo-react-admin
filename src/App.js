import React, { Component } from 'react';
import { init } from '@sentry/browser';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { DefaultLayout } from './containers';
import ErrorBoundary from './ErrorBoundary';
import GuestComponent from './components/GuestComponent';
import { Login, Register } from './views/Pages';
import './scss/style.scss';

const {
    NODE_ENV,
    REACT_APP_SENTRY_KEY,
    REACT_APP_SENTRY_PROJECT_ID,
} = process.env;

class App extends Component {
    componentDidMount() {
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
            <>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            name="Login Page"
                            render={(props) => (
                                <ErrorBoundary>
                                    <GuestComponent>
                                        <Login {...props} />
                                    </GuestComponent>
                                </ErrorBoundary>
                            )}
                        />
                        <Route
                            exact
                            path="/register"
                            name="Register Page"
                            render={(props) => (
                                <ErrorBoundary>
                                    <GuestComponent>
                                        <Register {...props} />
                                    </GuestComponent>
                                </ErrorBoundary>
                            )}
                        />
                        <Route
                            path="/"
                            name="Home"
                            component={DefaultLayout}
                        />
                    </Switch>
                </BrowserRouter>
                <ToastContainer
                    bodyClassName="color-black"
                    hideProgressBar
                />
            </>
        );
    }
}

export default App;
