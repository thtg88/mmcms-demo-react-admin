import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';
import ApiErrorCard from '../ApiErrorCard';
import ApiResourceCreateSuccessCard from '../ApiResourceCreateSuccessCard';
import ApiResourceUpdateSuccessCard from '../ApiResourceUpdateSuccessCard';
import CardHeaderActions from '../CardHeaderActions';
import DestroyResourceModal from '../DestroyResourceModal';
import getApiErrorMessages from '../../helpers/getApiErrorMessages';
import getResourceFromPaginatedResourcesAndId from '../../helpers/getResourceFromPaginatedResourcesAndId';

class Edit extends Component {
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
        const { match, resource, token } = this.props;
        // If resource is already in global state
        // Avoid re-fetching
        // console.log(resource);
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
    }

    componentDidUpdate(prevProps) {
        const {
            destroyed,
            errors,
            resource,
            updated
        } = this.props;
        const { destroying_resource, updating_resource } = this.state;

        // This means that I was destroying the resource,
        // And I received an destroyed from the store
        // So it's time to redirect to the index
        if(destroyed === true && errors.length !== 0 && destroying_resource === true) {
            this.setState({
                destroying_resource: false,
                is_modal_open: false
            })
        }

        // This means that I was updating the resource,
        // And I received an updated from the store
        // So it's time to restore the Update button
        else if(updated === true && errors.length !== 0 && updating_resource === true) {
            this.setState({
                getting_resource: false,
                updating_resource: false
            });
        }

        // console.log('prevProps', prevProps);
        else if(resource !== null && prevProps.resource === null) {
            // If component is receiving props
            // Set in the state so it can be updated properly
            // avoiding blank fields for ones that do not get updated
            this.setState({
                resource,
                getting_resource: false,
                updating_resource: false
            });
        }
    }

    componentWillUnmount() {
        this.props.clearMetadataResourceEdit();
    }

    render() {
        const {
            created,
            destroyed,
            errors,
            updated
        } = this.props;
        const {
            destroying_resource,
            getting_resource,
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

        console.log('resource', resource);
        console.log('resource_unchanged', resource_unchanged);
        console.log('updating_resource', updating_resource);

        if(destroyed === true) {
            return <Redirect to="/roles" />;
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
                <Row>
                    <Col md="12">
                        <ApiResourceCreateSuccessCard success={created} />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <ApiResourceUpdateSuccessCard success={updated} />
                    </Col>
                </Row>
                {resource === null
                    ? null
                    : <Row>
                        <Col md={12}>
                            <Card className="card-accent-warning">
                                <CardHeader>
                                    <strong>
                                        <i className="fa fa-black-tie"></i>
                                        {" "}
                                        Resource: {resource.name}
                                        <CardHeaderActions actions={actions} />
                                    </strong>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handleUpdateResource}>
                                        {Object.entries(resource).map(([key, value]) => (
                                            key.indexOf('id') === -1 && key.indexOf('_at') === -1
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
                                        ))}
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
                            isOpen={this.state.is_modal_open}
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
    const errors = getApiErrorMessages(state.roles.error);
    const params_id = parseInt(ownProps.match.params.id, 10);
    const {
        created,
        destroyed,
        resources,
        updated
    } = state.roles;
    let { resource } = state.roles;

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
        updated: updated
    };
};

const mapDispatchToProps = (dispatch) => ({
    clearMetadataResourceEdit() {
        dispatch({
            type: 'CLEAR_METADATA_ROLE_EDIT'
        })
    },
    destroyResource(data) {
        dispatch({
            type: 'DESTROY_ROLE_REQUEST',
            payload: data
        })
    },
    getResource(data) {
        dispatch({
            type: 'GET_ROLE_REQUEST',
            payload: data
        })
    },
    updateResource(data) {
        dispatch({
            type: 'UPDATE_ROLE_REQUEST',
            payload: data
        })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);