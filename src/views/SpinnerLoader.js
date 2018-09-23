import React from 'react';
import { Col, Row } from 'reactstrap';

const SpinnerLoader = (props) => (
    <Row style={{'height': '300px'}}>
        <Col xl={12} className="text-center" style={{'margin': 'auto'}}>
            <i className="fa fa-5x fa-spinner fa-spin"></i>
        </Col>
    </Row>
);

export default SpinnerLoader;
