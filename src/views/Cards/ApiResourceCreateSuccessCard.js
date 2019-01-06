import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody
} from 'reactstrap';

const ApiResourceCreateSuccessCard = ({ success }) => {

    if(success !== true) {
        return (
            null
        );
    }

    return (
        <Card className="border-success">
            <CardBody>
                <i className="fa fa-check"></i>
                {" "}
                Resource created successfully.
            </CardBody>
        </Card>
    );
}

ApiResourceCreateSuccessCard.propTypes = {
    success: PropTypes.bool
};

export default ApiResourceCreateSuccessCard;
