import React from 'react';
import { toast } from 'react-toastify';
import {
    Col,
    Row
} from 'reactstrap';

const notification = ({
    content,
    // onClose,
    title,
    type,
}) => toast(
    <Row>
        <Col sm="2">
            <i className={`fa fa-fw fa-lg fa-times fa-border-circle fa-${type}`}></i>
        </Col>
        <Col sm="10">
            <h5>{title}</h5>
            <p>{content}</p>
        </Col>
    </Row>
, { /*onClose*/ });

export default notification;
