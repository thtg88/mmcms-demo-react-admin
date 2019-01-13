import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    CardHeader
} from 'reactstrap';

const ApiErrorCard = ({ errors }) => {

    if(typeof errors === 'undefined' || errors === null || errors.length === 0) {
        return (
            null
        );
    }

    return (
        <Card className="border-danger">
            <CardHeader>
                <i className="fa fa-warning"></i>
                {' '}
                There were some problem with your request
            </CardHeader>
            <CardBody>
                {errors.map((error, idx) => (
                    <div key={idx}>{error}</div>
                ))}
            </CardBody>
        </Card>
    );
}

ApiErrorCard.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string)
};

export default ApiErrorCard;
