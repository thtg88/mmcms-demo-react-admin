import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Container } from 'reactstrap';
import {
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav
} from '@coreui/react';
import { Page404 } from '../../views/Pages';
import ErrorBoundary from '../../ErrorBoundary';
import LoggingOutCard from '../../views/Cards/LoggingOutCard';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import RestrictedComponent from './RestrictedComponent';
import waitingComponent from '../../views/waitingComponent';
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
                            <LoggingOutCard loggingOut={this.props.logging_out} />
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component
                                        ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                    <ErrorBoundary>
                                                        <RestrictedComponent>
                                                            {
                                                                waitingComponent(
                                                                    route.component,
                                                                    queryString.parse(this.props.location.search),
                                                                    {...props}
                                                                )
                                                            }
                                                        </RestrictedComponent>
                                                    </ErrorBoundary>
                                                )}
                                            />
                                        )
                                        : (null);
                                })}
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

const mapStateToProps = (state) => {
    return {
        logging_out: state.auth && state.auth.logging_out === true
    };
};

export default connect(
    mapStateToProps
)(DefaultLayout);
