import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { get } from '../../../../../helpers/formResources';

const ResourceGridItemHeader = ({
    columns,
    entity,
    nameField,
}) => {
    if(!nameField) {
        return null;
    }

    const nameFieldColumns = columns.filter((column) => {
        return column.dataField === nameField;
    });

    if(nameFieldColumns.length === 0) {
        return null;
    }

    const nameFieldColumn = nameFieldColumns[0];
    const value = get(entity, nameFieldColumn.dataField);
    const content = nameFieldColumn.formatter
        ? nameFieldColumn.formatter(value)
        : value;

    return (
        <Row>
            <Col className="col-md-12">
                {
                    nameFieldColumn.text
                        ? <h5>{`${nameFieldColumn.text}: ${content}`}</h5>
                        : <h5>{content}</h5>
                }
            </Col>
        </Row>
    );
};

ResourceGridItemHeader.propTypes = {
    columns: PropTypes.array,
    entity: PropTypes.object,
    nameField: PropTypes.string,
};

export default ResourceGridItemHeader;
