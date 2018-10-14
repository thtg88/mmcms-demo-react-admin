import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Card,
    Button,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';
import ApiErrorCard from '../Cards/ApiErrorCard';
import CardHeaderActions from '../CardHeaderActions';
import DestroyResourceModal from '../DestroyResourceModal';
import { getApiErrorMessages, isUnauthenticatedError } from '../../helpers/apiErrorMessages';
import getResourceFromPaginatedResourcesAndId from '../../helpers/getResourceFromPaginatedResourcesAndId';
import {
    apiResourceCreateSuccessNotification,
    apiResourceUpdateSuccessNotification
} from '../../helpers/notification';
import {
    clearMetadataResourceEdit,
    destroyResource,
    getPaginatedResources,
    getResource,
    updateResource
} from '../../redux/user/actions';
import { pageSize } from './tableConfig';

export class Edit extends Component {
    state = {
        destroying_resource: false,
        getting_resource: false,
        is_modal_open: false,
        resource: null,
        resource_unchanged: true,
        updating_resource: false
    };

    constructor(props) {
        super(props);

        this.handleDestroyResource = this.handleDestroyResource.bind(this);
        this.handleUpdateResource = this.handleUpdateResource.bind(this);
        this.toggleDestroyResourceModal = this.toggleDestroyResourceModal.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    handleDestroyResource(evt) {
        evt.preventDefault();

        const { destroyResource, token } = this.props;
        const { id } = this.state.resource;
        const data = { id, token };

        this.setState({
            destroying_resource: true,
        });

        destroyResource({ data });
    }

    handleUpdateResource(evt) {
        evt.preventDefault();

        const { updateResource, token } = this.props;
        const { resource } = this.state;
        const data = {
            id: resource.id,
            token,
            ...resource
        };

        this.setState({
            updating_resource: true
        });

        updateResource({ data });
    }

    toggleDestroyResourceModal(evt) {
        evt.preventDefault();

        this.setState({
            is_modal_open: !this.state.is_modal_open
        })
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
                [evt.target.name]: evt.target.value,
            }
        });
    }

    componentDidMount() {
        const {
            created,
            match,
            resource,
            token
        } = this.props;

        // console.log(resource);

        // If resource is already in global state
        // Avoid re-fetching
        if(resource === null) {
            const data = {
                token,
                id: match.params.id
            };
            this.props.getResource({ data });
            this.setState({
                getting_resource: true
            });
        } else {
            this.setState({ resource });
        }

        // Get all the resources in the background
        // so that when the user goes back to the list
        // he can see the latest changes
        if(created === true) {
            apiResourceCreateSuccessNotification({});

            const data = {
                token,
                page: 1,
                pageSize
            };
            this.props.getPaginatedResources({ data });
        }
    }

    componentDidUpdate(prevProps) {
        const {
            destroyed,
            errors,
            resource,
            unauthenticated,
            updated
        } = this.props;
        const { destroying_resource, updating_resource } = this.state;

        // if unauthenticated redirect to login
        if(prevProps.unauthenticated === false && unauthenticated === true) {
            this.props.loggedOut();
        }

        // This means that I was destroying the resource,
        // And I received a destroyed from the store
        // So restore the state  - this will trigger a re-render
        // which will redirect us to the index
        else if(
            typeof errors !== 'undefined'
            && typeof errors.length !== 'undefined'
            && errors.length === 0
            && destroying_resource === true
            && destroyed === true
        ) {
            this.setState({
                destroying_resource: false,
                is_modal_open: false
            });
        }

        // This means that I was updating the resource,
        // And I received errors from the store
        // So it's time to restore the Update button
        else if(
            updating_resource === true
            && typeof errors.length !== 'undefined'
            && errors.length !== 0
        ) {
            this.setState({
                getting_resource: false,
                updating_resource: false
            });
        }

        // This means that I was updating the resource,
        // And I received an updated from the store
        // So it's time to restore the Update button
        else if(
            updating_resource === true
            && updated === true
        ) {
            apiResourceUpdateSuccessNotification({});

            this.setState({
                getting_resource: false,
                updating_resource: false
            });
        }

        // This means that if I was destroying the resource,
        // And I have errors,
        // close the modal and show them
        else if(
            typeof errors !== 'undefined'
            && typeof errors.length !== 'undefined'
            && errors.length > 0
            && destroying_resource === true
        ) {
            this.setState({
                destroying_resource: false,
                is_modal_open: false
            });
        }

        // If component is receiving props
        // Set in the state so it can be updated properly
        // avoiding blank fields for ones that do not get updated
        else if(resource !== null && prevProps.resource === null) {
            this.setState({
                resource,
                getting_resource: false,
                updating_resource: false
            });
        }
    }

    componentWillUnmount() {
        const { clearMetadataResourceEdit } = this.props;

        if(typeof clearMetadataResourceEdit !== 'undefined') {
            clearMetadataResourceEdit();
        }
    }

    render() {
        const {
            destroyed,
            errors
        } = this.props;
        const {
            destroying_resource,
            getting_resource,
            is_modal_open,
            resource,
            resource_unchanged,
            updating_resource
        } = this.state;
        const actions = [
            {
                className: 'btn-outline-danger',
                disabled: getting_resource,
                iconClassName: 'fa fa-trash',
                onClick: this.toggleDestroyResourceModal,
                title: 'Remove Resource',
                type: 'button',
            }
        ];

        // console.log('resource', resource);
        // console.log('resource_unchanged', resource_unchanged);
        // console.log('updating_resource', updating_resource);

        if(destroyed === true) {
            return <Redirect to="/users" />;
        }

        let destroyButtonIconClassName = "fa fa-trash";
        if(destroying_resource === true) {
            destroyButtonIconClassName = "fa fa-spinner fa-spin";
        }

        let updateButtonIconClassName = "fa fa-save";
        if(updating_resource === true) {
            updateButtonIconClassName = "fa fa-spinner fa-spin";
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md="12">
                        <ApiErrorCard errors={errors} />
                    </Col>
                </Row>
                {
                    (
                        typeof resource === 'undefined'
                        || resource === null
                    )
                    ? null
                    : <Row>
                        <Col md={12}>
                            <Card className="card-accent-warning">
                                <CardHeader className="h1">
                                    {resource.name}
                                    <CardHeaderActions actions={actions} />
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handleUpdateResource}>
                                        {Object.entries(resource).map(([key, value]) => (
                                            (
                                                key.indexOf('id') === -1
                                                && key.indexOf('_at') === -1
                                            )
                                                ? <FormGroup key={key}>
                                                    <Label htmlFor={key}>{key}</Label>
                                                    <Input
                                                        type="text"
                                                        id={key}
                                                        name={key}
                                                        value={value ? value : ''}
                                                        placeholder={`Enter your ${key}`}
                                                        onChange={this.updateInputValue}
                                                    />
                                                </FormGroup>
                                                : null
                                            ))
                                        }
                                        <Button
                                            type="submit"
                                            size="md"
                                            color="warning"
                                            block
                                            disabled={resource_unchanged || updating_resource}
                                            onClick={this.handleUpdateResource}
                                        >
                                            <i className={updateButtonIconClassName}></i>
                                            {' '}
                                            Update
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                        <DestroyResourceModal
                            destroyButtonIconClassName={destroyButtonIconClassName}
                            disabled={destroying_resource}
                            isOpen={is_modal_open}
                            onDestroyButtonClick={this.handleDestroyResource}
                            toggle={this.toggleDestroyResourceModal}
                        />
                    </Row>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        created,
        destroyed,
        error,
        resources,
        updated
    } = state.users;
    const errors = getApiErrorMessages(error);
    const unauthenticated = isUnauthenticatedError(error);
    const params_id = parseInt(ownProps.match.params.id, 10);
    let { resource } = state.users;

    if(
        resource === null
        || typeof resource === 'undefined'
        || resource.id !== params_id
    ) {
        resource = getResourceFromPaginatedResourcesAndId(resources, params_id);
    }

    return {
        created: created,
        destroyed: destroyed,
        errors: errors,
        resource: typeof resource === 'undefined' ? null : resource,
        token: state.auth.token,
        unauthenticated: unauthenticated,
        updated: updated
    };
};

const mapDispatchToProps = (dispatch) => ({
    clearMetadataResourceEdit() {
        dispatch(clearMetadataResourceEdit());
    },
    destroyResource(data) {
        dispatch(destroyResource(data));
    },
    getPaginatedResources(data) {
        dispatch(getPaginatedResources(data));
    },
    getResource(data) {
        dispatch(getResource(data));
    },
    loggedOut(data) {
        dispatch({
            type: 'LOGGED_OUT',
            payload: data
        })
    },
    updateResource(data) {
        dispatch(updateResource(data));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);
