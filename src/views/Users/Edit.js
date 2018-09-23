import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card,
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
import ApiErrorCard from '../ApiErrorCard';
import getApiErrorMessages from '../../helpers/getApiErrorMessages';
import getResourceFromPaginatedResourcesAndId from '../../helpers/getResourceFromPaginatedResourcesAndId';

class Edit extends Component {
    state = {
        resource: null,
        resource_unchanged: true,
        updating_resource: false
    };

    constructor(props) {
        super(props);

        this.updateInputValue = this.updateInputValue.bind(this);
        this.handleUpdateResource = this.handleUpdateResource.bind(this);
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

    handleUpdateResource() {
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
            errors,
            resource,
            updated
        } = this.props;

        // console.log('prevProps', prevProps);
        if(resource !== prevProps.resource) {
            // If component is receiving props
            // Set in the state so it can be updated properly
            // avoiding blank fields for ones that do not get updated
            this.setState({
                resource,
                getting_resource: false,
                updating_resource: false
            });
        }

        if(updated === true && errors.length !== 0 && this.state.updating_resource === true) {
            this.setState({
                getting_resource: false,
                updating_resource: false
            });
        }
    }

    componentWillUnmount() {
        this.props.clearMetadataResource();
    }

    render() {
        const {
            errors
        } = this.props;
        const {
            resource,
            resource_unchanged,
            updating_resource
        } = this.state;

        // console.log(resource, resource_unchanged, updating_resource);

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
                {resource === null
                    ? null
                    : <Row>
                        <Col md={12}>
                            <Card className="card-accent-warning">
                                <CardHeader>
                                    <strong>
                                        <i className="fa fa-user"></i>
                                        {" "}
                                        Resource: {resource.name}
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
                                            type="button"
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
                    </Row>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const errors = getApiErrorMessages(state.users.error);
    const role_errors = getApiErrorMessages(state.roles.error);
    const params_id = parseInt(ownProps.match.params.id, 10);
    const {
        resources,
        updated
    } = state.users;
    let { resource } = state.users;

    if(
        resource === null
        || typeof resource === 'undefined'
        || resource.id !== params_id
    ) {
        resource = getResourceFromPaginatedResourcesAndId(resources, params_id);
    }

    return {
        errors: errors,
        resource: typeof resource === 'undefined' ? null : resource,
        role_errors: role_errors,
        roles: state.roles.resources,
        token: state.auth.token,
        updated: updated
    };
};

const mapDispatchToProps = (dispatch) => ({
    clearMetadataResource() {
        dispatch({
            type: 'CLEAR_METADATA_USER'
        })
    },
    getAllRoles(data) {
        dispatch({
            type: 'GET_ALL_ROLES_REQUEST',
            payload: data
        })
    },
    getResource(data) {
        dispatch({
            type: 'GET_USER_REQUEST',
            payload: data
        })
    },
    updateResource(data) {
        dispatch({
            type: 'UPDATE_USER_REQUEST',
            payload: data
        })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);
