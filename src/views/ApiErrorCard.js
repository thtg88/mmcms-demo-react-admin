import React from 'react';
import {
    Card,
    CardBody,
    CardHeader
} from 'reactstrap';

// const ApiErrorCard = ({ errors }) => {
//
//     if(typeof errors === 'undefined' || errors === null || errors.length === 0) {
//         return (
//             null
//         );
//     }
//
//     return (
//         <Card className="text-white bg-danger">
//             <CardHeader>
//                 <i className="fa fa-warning"></i>
//                 {" "}
//                 There were some problem with your request
//             </CardHeader>
//             <CardBody>
//                 {errors.map((error, idx) => (
//                     <div key={idx}>{error}</div>
//                 ))}
//             </CardBody>
//         </Card>
//     );
// }

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
                {" "}
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

// const ApiErrorCard = ({ errors }) => {
//
//     if(typeof errors === 'undefined' || errors === null || errors.length === 0) {
//         return (
//             null
//         );
//     }
//
//     return (
//         <Card className="card-accent-danger">
//             <CardHeader>
//                 <i className="fa fa-warning"></i>
//                 {" "}
//                 There were some problem with your request
//             </CardHeader>
//             <CardBody>
//                 {errors.map((error, idx) => (
//                     <div key={idx}>{error}</div>
//                 ))}
//             </CardBody>
//         </Card>
//     );
// }

export default ApiErrorCard;
