import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
<<<<<<< HEAD
=======
import { Page404 } from '../../views/Pages';
import LoggingOutAlert from '../../views/LoggingOutAlert';
>>>>>>> 7cc9f15e6769d79e766df4f95e5a5cafaadaaa0a
import {
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';
import { Page404 } from '../../views/Pages';
import LoggingOutAlert from '../../views/LoggingOutAlert';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import RestrictedComponent from './RestrictedComponent';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

class DefaultLayout extends Component {
    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <DefaultHeader history={this.props.history} />
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                            <AppSidebarForm />
                                <AppSidebarNav navConfig={navigation} {...this.props} />
                            <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={routes}/>
                        <Container fluid>
                            <LoggingOutAlert loggingOut={this.props.logging_out} />
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                                        <RestrictedComponent>
                                            <route.component {...props} />
                                        </RestrictedComponent>
                                    )} />)
                                    : (null);
                                },)}
                                <Route name="Page 404" component={Page404} />
                            </Switch>
                        </Container>
                    </main>
                </div>
                <AppFooter>
                    <DefaultFooter />
                </AppFooter>
            </div>
        );
    }
}
<<<<<<< HEAD

const mapStateToProps = (state) => {
=======
// export default DefaultLayout;

const mapStateToProps = (state) => {
    console.log('state.auth', state.auth);
>>>>>>> 7cc9f15e6769d79e766df4f95e5a5cafaadaaa0a
    return {
        logging_out: state.auth.logging_out
    }
};

export default connect(
    mapStateToProps
)(DefaultLayout);
