import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
// import CreateForm from './CreateForm';
import Table from './Table';
import ApiErrorCard from '../../../Cards/ApiErrorCard';
import { getApiErrorMessages } from '../../../../helpers/apiMessages';

const PivotTabContent = ({
    destinationBaseRoute,
    destinationRelationshipName,
    errors,
    parentResource,
    relationshipName,
    resourceDisplayName,
}) => {
    if(
        ! parentResource
        || ! parentResource[relationshipName]
    ) {
        return null;
    }

    return (
        <>
            <Row>
                <Col className="col-md-12">
                    <ApiErrorCard errors={errors} />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col className="col-md-12">
                    <Table
                        destinationBaseRoute={destinationBaseRoute}
                        destinationRelationshipName={destinationRelationshipName}
                        parentResource={parentResource}
                        relationshipName={relationshipName}
                        resourceDisplayName={resourceDisplayName}
                    />
                </Col>
            </Row>
            <hr />
            <Row className="mb-4">
                <Col className="col-md-12">
                    {/*<CreateForm parentResource={parentResource} />*/}
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    const { error } = state[ownProps.reducerName];
    const errors = getApiErrorMessages(error);

    return {
        errors,
    };
};

export default connect(mapStateToProps)(PivotTabContent);
