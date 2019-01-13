import React from 'react';
import PropTypes from 'prop-types';
import { Col, ListGroupItem, Row } from 'reactstrap';
import { get } from '../../../../helpers/formResources';

const ResourceListGroupItem = ({
    columns,
    entity,
    history,
    keyField,
    urlBuilder,
}) => (
    <ListGroupItem tag="button" action onClick={() => history.push(urlBuilder(entity))}>
        <Row>
            <Col md={12}>
                <h5>{`ID: ${entity.id}`}</h5>
            </Col>
        </Row>
        <Row>
            {
                columns.map((column, idx) => {
                    const {
                        className,
                        dataField,
                        text,
                    } = column;
                    const content = get(entity, dataField);

                    if(dataField === 'id') {
                        return null;
                    }

                    return (
                        <Col className={className} key={'entity_'+entity[keyField]+'_'+dataField}>
                            <strong>{`${text}: `}</strong>
                            {content}
                        </Col>
                    );
                })
            }
        </Row>
    </ListGroupItem>
);

ResourceListGroupItem.propTypes = {
    columns: PropTypes.array,
    entity: PropTypes.object,
    history: PropTypes.object,
    keyField: PropTypes.string,
    urlBuilder: PropTypes.func,
};

export default ResourceListGroupItem;
