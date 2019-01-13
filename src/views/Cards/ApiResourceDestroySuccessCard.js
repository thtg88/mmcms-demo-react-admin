import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardBody
} from 'reactstrap';

const ApiResourceDestroySuccessCard = ({ resourceDisplayName, success }) => {
    if(success !== true) {
        return null;
    }

    return (
        <Card className="border-success">
            <CardBody>
                <i className="fa fa-trash"></i>
                {' '}
                {resourceDisplayName ? resourceDisplayName : 'Resource'} destroyed successfully.
            </CardBody>
        </Card>
    );
}

ApiResourceDestroySuccessCard.propTypes = {
    resourceDisplayName: PropTypes.string,
    success: PropTypes.bool,
};

export default ApiResourceDestroySuccessCard;
