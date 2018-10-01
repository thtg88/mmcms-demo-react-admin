import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
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
// Containers
import { DefaultLayout } from './containers';
import ErrorBoundary from './ErrorBoundary';
import GuestComponent from './containers/DefaultLayout/GuestComponent';
// Pages
import { Login, Register } from './views/Pages';

class App extends Component {
    render() {
        return (
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
        );
    }
}
export default App;
