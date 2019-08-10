import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import ApiErrorCard from '../../Cards/ApiErrorCard';
import ApiWarningCard from '../../Cards/ApiWarningCard';
import AttributeTypeRow from './AttributeTypeRow';
import { apiResourceVariantsGenerateSuccessNotification } from '../../../helpers/toastNotification';
import {
    clearMetadataResourceGenerateVariants,
    generateVariants,
} from '../../../redux/products/actions';
import { reducerName as productsReducerName } from '../../../redux/products/schema';

class GenerateVariantsTabPaneContent extends Component {
    constructor(props) {
        super(props);

        this.handleGenerateVariants = this.handleGenerateVariants.bind(this);
        this.handleSetSelectedAttributeTypeId = this.handleSetSelectedAttributeTypeId.bind(this);
        this.handleSetSelectedAttributeValueId = this.handleSetSelectedAttributeValueId.bind(this);
        this.resetSelectedAttributeTypes = this.resetSelectedAttributeTypes.bind(this);

        this.state = {
            attributeTypes: [],
            isGeneratingVariants: false,
        };
    }

    handleGenerateVariants(evt) {
        const { generateVariants, parentResource, token } = this.props;
        const { attributeTypes } = this.state;

        evt.preventDefault();

        // Get all the attribute types selected
        const selectedAttributeTypes = attributeTypes.filter(attributeType => !!attributeType.selected);

        // For each selected attribute type, we only get the values that are selected,
        // The resulting array are grouped by attribute type id to improve generation of combination
        const selectedAttributeValueIds = selectedAttributeTypes.reduce(
            (result, attributeType) => {
                const newValueIds = attributeType.attribute_values.filter(attributeValue => !!attributeValue.selected)
                    .map(attributeValue => attributeValue.id);

                if(newValueIds.length === 0) {
                    return [...result];
                }

                return [
                    ...result,
                    {
                        attribute_type_id: attributeType.id,
                        attribute_value_ids: [...newValueIds],
                    },
                ];
            },
            []
        );

        if(selectedAttributeValueIds.length > 0) {
            this.setState({
                isGeneratingVariants: true,
            })

            const data = {
                token,
                id: parentResource.id,
                attribute_values: selectedAttributeValueIds,
            };
            generateVariants({ data });
        }
    }

    handleSetSelectedAttributeTypeId(attributeTypeId, selected) {
        const { attributeTypes } = this.state;

        this.setState({
            attributeTypes: attributeTypes.map(attributeType => {
                if(attributeTypeId !== attributeType.id) {
                    return {...attributeType};
                }

                return {
                    ...attributeType,
                    selected: selected,
                };
            }),
        });
    }

    handleSetSelectedAttributeValueId(attributeTypeId, attributeValueId, selected) {
        const { attributeTypes } = this.state;

        this.setState({
            attributeTypes: attributeTypes.map(attributeType => {
                if(attributeTypeId !== attributeType.id) {
                    return {...attributeType};
                }

                const newAttributeValues = attributeType.attribute_values.map(attributeValue => {
                    if(attributeValueId !== attributeValue.id) {
                        return {...attributeValue};
                    }

                    return {
                        ...attributeValue,
                        selected: selected,
                    };
                });

                return {
                    ...attributeType,
                    attribute_values: [...newAttributeValues],
                };
            }),
        });
    }

    resetSelectedAttributeTypes() {
        const { parentResource } = this.props;

        if(parentResource && parentResource.attribute_types) {
            this.setState({
                attributeTypes: parentResource.attribute_types.map(attributeType => {
                    const newAttributeValues = attributeType.attribute_values && attributeType.attribute_values.length
                        ? attributeType.attribute_values.map(attributeValue => ({...attributeValue, selected: false}))
                        : [];

                    return {
                        ...attributeType,
                        selected: false,
                        attribute_values: [...newAttributeValues],
                    };
                }),
            });
        }
    }

    componentDidMount() {
        this.resetSelectedAttributeTypes();
    }

    componentDidUpdate(prevProps) {
        const { errors, variantsGenerated, warnings } = this.props;
        const { isGeneratingVariants } = this.state;

        // This means that I was generating the variants for the resource,
        // And I received a variantsGenerated from the store
        // So restore the state - this will trigger a re-render
        if(
            isGeneratingVariants === true
            && variantsGenerated === true
        ) {
            this.setState({
                // hasVariants: true,
                isGeneratingVariants: false,
            });

            this.resetSelectedAttributeTypes();

            // TODO dispatch append variants in state

            apiResourceVariantsGenerateSuccessNotification({});

            setTimeout(
                () => clearMetadataResourceGenerateVariants(),
                500
            );
        }

        // This means that if I was destroying the resource,
        // And I have errors,
        // close the modal and show them
        else if(
            isGeneratingVariants === true
            && typeof errors !== 'undefined'
            && typeof errors.length !== 'undefined'
            && errors.length > 0
        ) {
            this.setState({
                isGeneratingVariants: false,
            });
        }

        // This means that if I was destroying the resource,
        // And I have errors,
        // close the modal and show them
        else if(
            isGeneratingVariants === true
            && typeof warnings !== 'undefined'
            && typeof warnings.length !== 'undefined'
            && warnings.length > 0
        ) {
            this.setState({
                isGeneratingVariants: false,
            });
        }
    }

    render() {
        const { errors, warnings } = this.props;
        const { attributeTypes, isGeneratingVariants } = this.state;

        if(
            !attributeTypes
            || !attributeTypes.length
        ) {
            return (
                <p>
                    No attributes available to select.
                    To create some, click <Link to="/attribute-types/create">here</Link>
                </p>
            );
        }

        const generateVariantsButtonIconClassName = isGeneratingVariants === true
            ? 'fa fa-fw fa-spin fa-spinner'
            : 'fa fa-fw fa-plus';

        // Add variants noValuesSelected property
        // The button is disabled if all the attribute types are not selected
        // Or any of the attribute types is selected but 0 total values are selected
        const noValuesSelected = attributeTypes.filter(attributeType => {
            return !!attributeType.selected
            && attributeType.attribute_values.filter(attributeValue => !!attributeValue.selected).length > 0;
        }).length === 0;

        return (
            <>
                <Row>
                    <Col className="col-md-12">
                        <ApiErrorCard errors={errors} />
                    </Col>
                </Row>
                <Row>
                    <Col className="col-md-12">
                        <ApiWarningCard warnings={warnings} />
                    </Col>
                </Row>
                <Row>
                    <Col className="col-md-12">
                        <p>Please select the relevant attribute groups for this product, then their applicable values.</p>
                        <p>
                            Variants will be created generating all possible
                            {' '}
                            <a href="https://en.wikipedia.org/wiki/Combination" target="_blank" rel="noopener noreferrer">combinations</a>
                            {' '}
                            of the selected values,
                            {' '}
                            e.g. if you selected Sizes S and M, and Colour black and blue,
                            {' '}
                            the resulting combinations will be S black, S blue, M black, and M blue.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-md-12">
                        {
                            attributeTypes.map(attributeType => (
                                <AttributeTypeRow
                                    key={attributeType.id}
                                    attributeType={attributeType}
                                    handleSetSelectedAttributeTypeId={this.handleSetSelectedAttributeTypeId}
                                    handleSetSelectedAttributeValueId={this.handleSetSelectedAttributeValueId}
                                />
                            ))
                        }
                    </Col>
                </Row>
                <Row>
                    <Col className="col-md-4 col-12">
                        <Button
                            type="button"
                            color="success"
                            block
                            onClick={this.handleGenerateVariants}
                            disabled={noValuesSelected || isGeneratingVariants}
                        >
                            <i className={generateVariantsButtonIconClassName}></i>
                            {' '}
                            Generate Variants
                        </Button>
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => {
    const { token } = state.auth;
    const {
        errors,
        variantsGenerated,
        warnings,
    } = state[productsReducerName];

    return {
        errors,
        token,
        variantsGenerated,
        warnings,
    };
};

const mapDispatchToProps = {
    clearMetadataResourceGenerateVariants,
    generateVariants,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenerateVariantsTabPaneContent);
