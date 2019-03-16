import React from 'react';
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
import LoggingOutCard from '../../components/Cards/LoggingOutCard';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import RestrictedComponent from './RestrictedComponent';
import waitingComponent from '../../components/waitingComponent';
import navigation from '../../_nav';
import routes from '../../routes';

const DefaultLayout = props => {
    const { location, logging_out } = props;

    return (
        <div className="app">
            <AppHeader fixed>
                <DefaultHeader />
            </AppHeader>
            <div className="app-body">
                <AppSidebar fixed display="lg">
                    <AppSidebarHeader />
                    <AppSidebarForm />
                    <AppSidebarNav
                        navConfig={navigation}
                        {...props}
                    />
                    <AppSidebarFooter />
                    <AppSidebarMinimizer />
                </AppSidebar>
                <main className="main">
                    <AppBreadcrumb appRoutes={routes}/>
                    <Container fluid>
                        <LoggingOutCard loggingOut={logging_out} />
                        <Switch>
                            {
                                routes.map((route, idx) => {
                                    return route.component
                                        ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={routeProps => (
                                                    <ErrorBoundary>
                                                        <RestrictedComponent>
                                                            {
                                                                waitingComponent(
                                                                    route.component,
                                                                    queryString.parse(location.search),
                                                                    {...routeProps}
                                                                )
                                                            }
                                                        </RestrictedComponent>
                                                    </ErrorBoundary>
                                                )}
                                            />
                                        )
                                        : null;
                                })
                            }
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
};

const mapStateToProps = state => {
    const { logging_out } = state.auth;

    return {
        logging_out: logging_out === true,
    };
};

export default connect(
    mapStateToProps
)(DefaultLayout);
