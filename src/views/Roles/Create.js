import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateResource from '../CreateResource';
import {
    getApiErrorMessages,
    isUnauthenticatedError
} from '../../helpers/apiErrorMessages';
import { getValuesFromFormResource } from '../../helpers/formResources';
import { loggedOut } from '../../redux/auth/actions';
import {
    clearMetadataResourceCreate,
    createResource
} from '../../redux/role/actions';

export class Create extends Component {
    state = {
        resource: {
            display_name: {
                type: 'text',
                value: ''
            },
            name: {
                type: 'text',
                value: ''
            },
            priority: {
                type: 'number',
                value: ''
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

    handleCreateResource(evt) {
        evt.preventDefault();

        const { createResource, token } = this.props;
        const { resource } = this.state;
        const values = getValuesFromFormResource(resource);
        const data = { token, ...values };

        this.setState({
            creating_resource: true
        });

        createResource({ data });
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
        // console.log('resource_unchanged', resource_unchanged);
        // console.log('creating_resource', creating_resource);

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

const mapStateToProps = (state, ownProps) => {
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
    loggedOut
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
