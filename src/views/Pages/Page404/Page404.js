import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Button,
    Col,
    Container,
    Row
} from 'reactstrap';

class Page404 extends Component {
    state = {
        redirect_home: false,
    };

    constructor(props) {
        super(props);

        this.redirectHome = this.redirectHome.bind(this);
    }

    redirectHome() {
        this.setState({
            redirect_home: true,
        });
    }

    render() {
        const { redirect_home } = this.state;

        if(redirect_home === true) {
            return <Redirect push to="/" />;
        }

        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <div className="clearfix">
                                <h1 className="float-left display-3 mr-4">404</h1>
                                <h4 className="pt-3">Oops! You're lost.</h4>
                                <p className="text-muted float-left">The page you are looking for was not found.</p>
                            </div>
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
}

export default Page404;
