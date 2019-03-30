import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';

const RecoveringResourceCard = ({ isRecovering, resourceDisplayName }) => {
    if(isRecovering !== true) {
        return null;
    }

    return (
        <Card className="border-danger">
            <CardBody>
                Please note you will not be able to edit this {resourceDisplayName} while you are in recovery mode.
                {' '}
                If you want to edit it, please recover it first using the button above.
            </CardBody>
        </Card>
    );
}

RecoveringResourceCard.propTypes = {
    isRecovering: PropTypes.bool,
};

export default RecoveringResourceCard;
