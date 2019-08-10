import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import {
    filterSchemaFromAttributes,
    updateFormResourceFromErrors,
    updateFormSchemaValuesWithUrlParameters,
} from '../../helpers/formResources';
import slugify from '../../helpers/slugify';

const withUpdateFormSchema = ({
    attributesSequenceToShow,
    nameField,
    schema,
}) => (ComponentToWrap) => {
    // We deep copy schema so we are sure we are working with a fresh copy
    // e.g. no wiriting on old references or for next time we use schema
    const updatedSchema = cloneDeep(schema);

    class UpdateFormSchemaHOC extends Component {
        constructor(props) {
            super(props);

            this.batchUpdateFormSchemaAttributes = this.batchUpdateFormSchemaAttributes.bind(this);
            this.forceUpdateSchema = this.forceUpdateSchema.bind(this);
            this.resetFormSchemaErrors = this.resetFormSchemaErrors.bind(this);
            this.setAllFormSchema = this.setAllFormSchema.bind(this);
            this.setFormSchemaErrors = this.setFormSchemaErrors.bind(this);
            this.setInputValueState = this.setInputValueState.bind(this);
            this.updateInputValue = this.updateInputValue.bind(this);
            this.updateFormSchemaAttribute = this.updateFormSchemaAttribute.bind(this);

            this.state = {
                formSchema: updateFormSchemaValuesWithUrlParameters(
                    filterSchemaFromAttributes(updatedSchema, attributesSequenceToShow),
                    props.urlParams
                ),
                resourceUnchanged: true,
            };
        }

        batchUpdateFormSchemaAttributes(attributes, resourceUnchanged) {
            const formSchema = cloneDeep(this.state.formSchema);
            const oldResourceUnchanged = this.state.resourceUnchanged;

            if(attributes.constructor === Array) {
                attributes.forEach(({name, attribute, value}) => {
                    if(
                        name
                        && attribute
                        && formSchema[name]
                    ) {
                        formSchema[name][attribute] = value;
                    }
                });

                // Optionally set resourceUnchanged if provided
                const newResourceUnchanged = (
                    typeof resourceUnchanged !== 'undefined'
                    && (
                        resourceUnchanged === true
                        || resourceUnchanged === false
                    )
                )
                    ? resourceUnchanged
                    : oldResourceUnchanged;

                this.setState({
                    formSchema,
                    resourceUnchanged: newResourceUnchanged,
                });
            }
        }

        forceUpdateSchema() {
            const { urlParams } = this.props;

            const newSchema = updateFormSchemaValuesWithUrlParameters(
                filterSchemaFromAttributes(schema, attributesSequenceToShow),
                urlParams
            );

            this.setState({
                formSchema: newSchema,
            });
        }

        resetFormSchemaErrors() {
            const { formSchema } = this.state;

            // Reset errors
            this.setState({
                formSchema: updateFormResourceFromErrors(formSchema, {inner:[]}),
            });
        }

        setAllFormSchema(formSchema) {
            this.setState({formSchema: cloneDeep(formSchema)});
        }

        setFormSchemaErrors(errors) {
            const formSchema = cloneDeep(this.state.formSchema);

            this.setState({
                formSchema: updateFormResourceFromErrors(formSchema, errors),
            });
        }

        setInputValueState(name, value) {
            const { resourceUnchanged } = this.state;
            const formSchema = cloneDeep(this.state.formSchema);

            const newState = {
                formSchema: Object.assign(formSchema, {
                    [name]: Object.assign(formSchema[name], { value }),
                }),
            };

            if(name !== 'slug' && name === nameField && formSchema.slug) {
                newState.formSchema.slug = {
                    ...formSchema.slug,
                    value: slugify(value),
                };
            }

            if(resourceUnchanged === true) {
                // If the resource has not been changed
                // We set the state to cater for that
                newState.resourceUnchanged = false;
            }

            this.setState({
                ...newState,
            });
        }

        updateFormSchemaAttribute(name, attribute, value) {
            const formSchema = cloneDeep(this.state.formSchema);

            if(formSchema[name]) {
	            formSchema[name][attribute] = value;

                this.setState({formSchema});
            }
        }

        updateInputValue(evt, extra) {
            this.setInputValueState(evt.target.name, evt.target.value);
        }

        render() {
            return (
                <ComponentToWrap
                    {...this.props}
                    {...this.state}
                    batchUpdateFormSchemaAttributes={this.batchUpdateFormSchemaAttributes}
                    forceUpdateSchema={this.forceUpdateSchema}
                    resetFormSchemaErrors={this.resetFormSchemaErrors}
                    setAllFormSchema={this.setAllFormSchema}
                    setFormSchemaErrors={this.setFormSchemaErrors}
                    updateFormSchemaAttribute={this.updateFormSchemaAttribute}
                    updateInputValue={this.updateInputValue}
                />
            )
        }
    }

    return UpdateFormSchemaHOC;
}

export default withUpdateFormSchema;
