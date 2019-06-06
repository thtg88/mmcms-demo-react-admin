import React from 'react';
import { Col, Row } from 'reactstrap';

const EmptyGridItem = () => (
    <Row>
        <Col className="col-md-12 col-12">
            <h5>No matching records found.</h5>
        </Col>
    </Row>
);

export default EmptyGridItem;
