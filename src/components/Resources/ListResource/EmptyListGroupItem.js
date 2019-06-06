import React from 'react';
import { Col, ListGroupItem, Row } from 'reactstrap';

const EmptyListGroupItem = () => (
    <ListGroupItem tag="button" action onClick={() => {}}>
        <Row>
            <Col className="col-md-12">
                <h5>No matching records found.</h5>
            </Col>
        </Row>
    </ListGroupItem>
);

export default EmptyListGroupItem;
