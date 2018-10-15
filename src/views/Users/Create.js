import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import CreateResource from '../CreateResource';
import {
    getApiErrorMessages,
    isUnauthenticatedError
} from '../../helpers/apiErrorMessages';
import {
    getValidationSchemaFromFormResource,
    getValuesFromFormResource,
    updateFormResourceFromErrors,
} from '../../helpers/formResources';
import { loggedOut } from '../../redux/auth/actions';
import {
    clearMetadataResourceCreate,
    createResource
} from '../../redux/user/actions';

export class Create extends Component {
    state = {
        resource: {
            name: {
                type: 'text',
                value: '',
                rules: yup.string()
                    .required()
                    .max(255),
                errors: [],
            },
            email: {
                type: 'email',
                value: '',
                rules: yup.string()
                    .required()
                    .email()
                    .max(255),
                errors: [],
            },
            password: {
                type: 'password',
                value: '',
                rules: yup.string()
                    .required()
                    .min(6)
                    .max(255),
                errors: [],
            },
            password_confirmation: {
                label: "Confirm Password",
                placeholder: "Confirm your password",
                type: 'password',
                value: '',
                rules: yup.string()
                    .required()
                    .min(6)
                    .max(255),
                errors: [],
            },
        },
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
        const schema = getValidationSchemaFromFormResource(resource);
        const data = { token, ...values };

        this.resetErrors();

        await yup.object(schema)
            .validate(
                values,
                { abortEarly: false }
            )
            .then(() => {
                this.setState({
                    creating_resource: true
                });

                createResource({ data });
            })
            .catch((errors) => {
                const { resource } = this.state;

                this.setState({
                    resource: updateFormResourceFromErrors(resource, errors)
                });
            });
    }

    resetErrors() {
        const { resource } = this.state;
        const new_resource = Object.entries(resource).reduce(
            (result, [name, parameters]) => {
                // console.log(result, name, parameters);

                return {
                    ...result,
                    [name]: {
                        ...parameters,
                        errors: []
                    }
                };
            },
            {}
        );

        this.setState({
            resource: new_resource
        });
    }

    componentDidMount() {
        //
    }

    componentDidUpdate(prevProps) {
        const {
            errors,
            created,
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
            history.push('/users/'+resource.id);
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
        // console.log('resource_unchanged', resource_unchanged);
        console.log('errors', this.state.resource);

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
    } = state.users;
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
