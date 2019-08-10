import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Button,
    ButtonGroup,
    Col,
    Collapse,
    Row,
} from 'reactstrap';

const AttributeTypeRow = ({
    attributeType,
    handleSetSelectedAttributeTypeId,
    handleSetSelectedAttributeValueId,
}) => {
    if(!attributeType) {
        return null;
    }

    return (
        <>
            <Row className="mb-2">
                <Col className="col-md-4 col-12">
                    <Button
                        type="button"
                        block
                        className="colour-black"
                        color="secondary"
                        outline={!attributeType.selected}
                        onClick={() => handleSetSelectedAttributeTypeId(attributeType.id, !attributeType.selected)}
                    >
                        {attributeType.name}
                    </Button>
                </Col>
            </Row>
            <Collapse isOpen={attributeType.selected}>
                <Row className="mb-4">
                    <Col className="col-12">
                        <ButtonGroup>
                            {
                                attributeType.attribute_values && attributeType.attribute_values.length > 0
                                    ? attributeType.attribute_values.map(attributeValue => {
                                        return (
                                            <Button
                                                key={`attributeValue_${attributeValue.id}`}
                                                type="button"
                                                className="colour-black"
                                                color="secondary"
                                                onClick={() => handleSetSelectedAttributeValueId(attributeType.id, attributeValue.id, !attributeValue.selected)}
                                                outline={!attributeValue.selected}
                                            >
                                                {attributeValue.name}
                                            </Button>
                                        );
                                    })
                                    : (
                                        <p>
                                            No attributes available to select for this type.
                                            To create one, click <Link to="/attribute-values/create">here</Link>
                                        </p>
                                    )
                            }
                        </ButtonGroup>
                    </Col>
                </Row>
            </Collapse>
        </>
    );
};

AttributeTypeRow.propTypes = {
    attributeType: PropTypes.shape({
        attribute_values: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                selected: PropTypes.bool,
            })
        ),
        name: PropTypes.string,
    }),
    handleSetSelectedAttributeTypeId: PropTypes.func,
    handleSetSelectedAttributeValueId: PropTypes.func,
};

export default AttributeTypeRow;
