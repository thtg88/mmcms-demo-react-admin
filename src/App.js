import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
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
// Pages
import { Login, Register } from './views/Pages';
import configureStore from './redux/store';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" name="Login Page" component={Login} />
                        <Route exact path="/register" name="Register Page" component={Register} />
                        <Route path="/" name="Home" component={DefaultLayout} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}
export default App;
