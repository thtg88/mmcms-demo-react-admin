import React, { Component } from 'react';
import { captureException } from '@sentry/browser';
import { Link } from 'react-router-dom';
import {
    Button,
    Col,
    Container,
    Row
} from 'reactstrap';

const {
    NODE_ENV,
    REACT_APP_SENTRY_KEY,
    REACT_APP_SENTRY_PROJECT_ID,
} = process.env;

class ErrorBoundary extends Component {
    state = {
        error: null,
    };

    componentDidCatch(error, errorInfo) {
        this.setState({ error });

        if(
            NODE_ENV === 'production'
            && typeof REACT_APP_SENTRY_KEY !== 'undefined'
            && REACT_APP_SENTRY_KEY !== null
            && REACT_APP_SENTRY_KEY !== ''
            && typeof REACT_APP_SENTRY_PROJECT_ID !== 'undefined'
            && REACT_APP_SENTRY_PROJECT_ID !== null
            && REACT_APP_SENTRY_PROJECT_ID !== ''
        ) {
            // If app in production, send error to Sentry
            captureException(error);
        }
    }

    render() {
        const { children } = this.props;
        const { error } = this.state;

        if (error !== null) {
            return (
                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="6">
                                <span className="clearfix">
                                    <h1 className="float-left display-3 mr-4">500</h1>
                                    <h4 className="pt-3">Houston, we have a problem!</h4>
                                    <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
                                </span>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md="6">
                                <Button tag={Link} to="/dashboard" className="btn-home btn-brand">
                                    <i className="fa fa-home"></i>
                                    <span>Home</span>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }

        // when there's not an error, render children untouched
        return children;
    }
}

export default ErrorBoundary;
