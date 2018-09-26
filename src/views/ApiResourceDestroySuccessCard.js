import React from 'react';
import {
    Card,
    CardBody
} from 'reactstrap';

const ApiResourceDestroySuccessCard = ({ success, resourceDisplayName }) => {

    if(success !== true) {
        return (
            null
        );
    }

    return (
        <Card className="border-success">
            <CardBody>
                <i className="fa fa-trash"></i>
                {" "}
                {resourceDisplayName ? resourceDisplayName : "Resource"} destroyed successfully.
            </CardBody>
        </Card>
    );
}

export default ApiResourceDestroySuccessCard;
