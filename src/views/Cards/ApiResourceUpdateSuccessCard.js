import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody
} from 'reactstrap';

const ApiResourceUpdateSuccessCard = ({ success, resourceDisplayName }) => {

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
                {resourceDisplayName ? resourceDisplayName : "Resource"} updated successfully.
            </CardBody>
        </Card>
    );
}

ApiResourceUpdateSuccessCard.propTypes = {
    success: PropTypes.bool,
    resourceDisplayName: PropTypes.string
};

export default ApiResourceUpdateSuccessCard;
