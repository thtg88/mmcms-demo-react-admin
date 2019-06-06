import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    CardHeader
} from 'reactstrap';

const ApiWarningCard = ({ warnings }) => {
    if(typeof warnings === 'undefined' || warnings === null || warnings.length === 0) {
        return null;
    }

    return (
        <Card className="border-warning">
            <CardHeader>
                <i className="fa fa-warning"></i>
                {' '}
                There were some problems with your request
            </CardHeader>
            <CardBody>
                {
                    warnings.map((warning, idx) => (
                        <div key={idx}>{warning}</div>
                    ))
                }
            </CardBody>
        </Card>
    );
}

ApiWarningCard.propTypes = {
    warnings: PropTypes.arrayOf(PropTypes.string)
};

export default ApiWarningCard;
