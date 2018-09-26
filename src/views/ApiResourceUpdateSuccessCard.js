import React from 'react';
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

export default ApiResourceUpdateSuccessCard;
