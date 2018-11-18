import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import CreateResource from '../CreateResource';
import {
    getApiErrorMessages,
    isUnauthenticatedError
} from '../../../helpers/apiErrorMessages';
import {
    getValidationSchemaFromFormResource,
    getValuesFromFormResource,
    updateFormResourceFromErrors,
} from '../../../helpers/formResources';
import { loggedOut } from '../../../redux/auth/actions';
import {
    clearMetadataResourceCreate,
    createResource
} from '../../../redux/roles/actions';
import schema from '../../../redux/roles/schema';

export class Create extends Component {
    state = {
        resource: schema,
        resource_unchanged: true,
        creating_resource: false
    };

    constructor(props) {
        super(props);

        this.updateInputValue = this.updateInputValue.bind(this);
        this.handleCreateResource = this.handleCreateResource.bind(this);
    }

    updateInputValue(evt) {
        if(this.state.resource_unchanged === true) {
            this.setState({
                resource_unchanged: false,
            });
        }

        this.setState({
            resource: {
                ...this.state.resource,
                [evt.target.name]: {
                    ...this.state.resource[evt.target.name],
                    value: evt.target.value
                },
            }
        });
    }

    async handleCreateResource(evt) {
        evt.preventDefault();

        const { createResource, token } = this.props;
        const { resource } = this.state;
        const values = getValuesFromFormResource(resource);
        const validationSchema = getValidationSchemaFromFormResource(resource);
        const data = { token, ...values };

        // Reset errors
        this.setState({
            resource: updateFormResourceFromErrors(resource, {inner:[]})
        });

        await yup.object(validationSchema)
            .validate(
                values,
                { abortEarly: false }
            )
            .then(() => {
                // If validation passes
                // Create resource

                this.setState({
                    creating_resource: true
                });

                createResource({ data });
            })
            .catch((errors) => {
                // If validation does not passes
                // Set errors in the form
                this.setState({
                    resource: updateFormResourceFromErrors(resource, errors)
                });
            });
    }

    componentDidMount() {
        //
    }

    componentDidUpdate(prevProps) {
        const {
            created,
            errors,
            history,
            loggedOut,
            resource,
            unauthenticated
        } = this.props;

        // if unauthenticated redirect to login
        if(prevProps.unauthenticated === false && unauthenticated === true) {
            loggedOut();
        }

        // If I am receiving errors and I am creating the resource
        // Set the creating resource to false
        else if(errors.length !== 0 && this.state.creating_resource === true) {
            this.setState({
                creating_resource: false
            });
        }

        // If received created=true and resource id is there
        // Redirect to resource edit
        else if(
            prevProps.created !== true
            && created === true
            && typeof resource.id !== 'undefined'
        ) {
            history.push('/roles/'+resource.id);
        }
    }

    componentWillUnmount() {
        const { clearMetadataResourceCreate } = this.props;

        if(typeof clearMetadataResourceCreate !== 'undefined') {
            clearMetadataResourceCreate();
        }
    }

    render() {
        const { errors } = this.props;
        const {
            creating_resource,
            resource,
            resource_unchanged
        } = this.state;

        // console.log('resource', resource);

        return (
            <CreateResource
                creatingResource={creating_resource}
                errors={errors}
                handleCreateResource={this.handleCreateResource}
                resource={resource}
                resourceUnchanged={resource_unchanged}
                updateInputValue={this.updateInputValue}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const {
        created,
        error,
        resource
    } = state.roles;
    const errors = getApiErrorMessages(error);
    const unauthenticated = isUnauthenticatedError(error);

    return {
        created: created,
        errors: errors,
        resource: typeof resource === 'undefined' ? null : resource,
        token: state.auth.token,
        unauthenticated: unauthenticated
    };
};

const mapDispatchToProps = {
    clearMetadataResourceCreate,
    createResource,
    loggedOut,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
