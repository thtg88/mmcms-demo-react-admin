import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Button,
    Col,
    Container,
    Row
} from 'reactstrap';

class ErrorBoundary extends Component {
    state = {
        error: null,
        redirect_home: false
    };

    constructor(props) {
        super(props);

        this.redirectHome = this.redirectHome.bind(this);
    }

    redirectHome() {
        this.setState({
            redirect_home: true
        });
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });

        if(process.env.NODE_ENV === 'production') {
            // window.Raven.captureException(error, { extra: errorInfo });
        }
    }

    render() {
        if (this.state.error !== null) {
            // Render fallback UI

            if(this.state.redirect_home === true) {
                return <Redirect to="/" />;
            }

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
                                <Button className="btn-home btn-brand" onClick={this.redirectHome}>
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
        return this.props.children;
    }
}

export default ErrorBoundary;
