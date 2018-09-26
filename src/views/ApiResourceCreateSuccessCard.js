import React from 'react';
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

export default ApiResourceCreateSuccessCard;
