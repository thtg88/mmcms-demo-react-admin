import React from 'react';
import PropTypes from 'prop-types';
import { Col, ListGroupItem, Row } from 'reactstrap';

const ResourceListGroupItem = ({
    columns,
    entity,
    history,
    keyField,
    urlBuilder
}) => (
    <ListGroupItem tag="button" action onClick={() => history.push(urlBuilder(entity))}>
        <Row>
            <Col md={12}>
                <h5>{`ID: ${entity.id}`}</h5>
            </Col>
        </Row>
        <Row>
            {columns.map((column, idx) => {
                const content = get(entity, column.dataField);

                if(column.dataField === 'id') {
                    return (null);
                }

                return (
                    <Col className={column.className} key={'entity_'+entity[keyField]+'_'+column.dataField}>
                        <strong>{`${column.text}: `}</strong>
                        {content}
                    </Col>
                );
            })}
        </Row>
    </ListGroupItem>
);

ResourceListGroupItem.propTypes = {
    columns: PropTypes.array,
    entity: PropTypes.object,
    keyField: PropTypes.string,
    urlBuilder: PropTypes.func
};

export default ResourceListGroupItem;

const get = (target, field) => {
    var pathArray = splitNested(field);
    var result = void 0;

    try {
        result = pathArray.reduce(function (curr, path) {
            return curr[path];
        }, target);
    } catch (e) {}

    return result ? result : 'N/A';
};

const splitNested = (str) => {
    return [str].join('.').replace(/\[/g, '.').replace(/\]/g, '').split('.');
};
