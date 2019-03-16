import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Button,
    Col,
    Container,
    Row
} from 'reactstrap';

const Page404 = () => {
    const [redirectHome, setRedirectHome] = useState(false);

    if(redirectHome === true) {
        return <Redirect push to="/" />;
    }

    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col className="col-md-6">
                        <div className="clearfix">
                            <h1 className="float-left display-3 mr-4">404</h1>
                            <h4 className="pt-3">Oops! You're lost.</h4>
                            <p className="text-muted float-left">The page you are looking for was not found.</p>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="col-md-6">
                        <Button className="btn-home btn-brand" onClick={() => setRedirectHome(true)}>
                            <i className="fa fa-home"></i>
                            <span>Home</span>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Page404;
