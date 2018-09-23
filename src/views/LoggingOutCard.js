import React from 'react';
import { Card, CardBody } from 'reactstrap';

const LoggingOutCard = ({ loggingOut }) => {

    if(loggingOut !== true) {
        return (
            null
        );
    }

    return (
        <Card className="border-primary">
            <CardBody>
                <i className="fa fa-spinner fa-spin"></i>
                {' '}
                Logging out...
            </CardBody>
        </Card>
    );
};

export default LoggingOutCard;
