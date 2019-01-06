import React from 'react';
import PropTypes from 'prop-types';
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

LoggingOutCard.propTypes = {
    loggingOut: PropTypes.bool
};

export default LoggingOutCard;
