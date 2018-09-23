import React from 'react';
import {
    Card,
    CardBody
} from 'reactstrap';

// const ApiResourceCreateSuccessCard = ({ success }) => {
//
//     if(success !== true) {
//         return (
//             null
//         );
//     }
//
//     return (
//         <Card className="text-white bg-success">
//             <CardBody>
//                 <i className="fa fa-check"></i>
//                 {" "}
//                 Resource created successfully.
//             </CardBody>
//         </Card>
//     );
// }

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

// const ApiResourceCreateSuccessCard = ({ success }) => {
//
//     if(success !== true) {
//         return (
//             null
//         );
//     }
//
//     return (
//         <Card className="card-accent-success">
//             <CardBody>
//                 <i className="fa fa-check"></i>
//                 {" "}
//                 Resource created successfully.
//             </CardBody>
//         </Card>
//     );
// }

export default ApiResourceCreateSuccessCard;
