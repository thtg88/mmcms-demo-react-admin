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

class Create extends Component {
    state = {
        resource: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
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
                [evt.target.name]: evt.target.value,
            }
        });
    }

    handleCreateResource(evt) {
        evt.preventDefault();

        const { createResource, token } = this.props;
        const { resource } = this.state;
        const data = { token, ...resource };

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
            errors,
            resource,
            created
        } = this.props;

        // console.log('prevProps', prevProps);
        if(resource !== prevProps.resource) {
            // If component is receiving props
            // Set in the state so it can be created properly
            // avoiding blank fields for ones that do not get created
            this.setState({
                resource,
                creating_resource: false
            });
        }

        if(errors.length !== 0 && this.state.creating_resource === true) {
            this.setState({
                creating_resource: false
            });
        }

        if(prevProps.created !== true && created === true && typeof resource.id !== 'undefined') {
            console.log('resource created', resource);
            this.props.history.push('/users/'+resource.id)
        }
    }

    componentWillUnmount() {
        this.props.clearMetadataResourceCreate();
    }

    render() {
        const { errors } = this.props;
        const {
            resource_unchanged,
            creating_resource
        } = this.state;

        // console.log('resource', resource);
        // console.log('resource_unchanged', resource_unchanged);
        // console.log('creating_resource', creating_resource);

        let createButtonIconClassName = "fa fa-plus";
        if(creating_resource === true) {
            createButtonIconClassName = "fa fa-spinner fa-spin";
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md="12">
                        <ApiErrorCard errors={errors} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Card className="card-accent-success">
                            <CardHeader>
                                <strong>
                                    <i className="fa fa-user-plus"></i>
                                    {" "}
                                    Create Resource
                                </strong>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={this.handleCreateResource}>
                                    <FormGroup>
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={this.state.resource.name}
                                            placeholder="Enter your name"
                                            onChange={this.updateInputValue}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={this.state.resource.email}
                                            placeholder="Enter your email"
                                            onChange={this.updateInputValue}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={this.state.resource.password}
                                            placeholder="Enter your password"
                                            onChange={this.updateInputValue}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                                        <Input
                                            type="password"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={this.state.resource.password_confirmation}
                                            placeholder="Confirm your password"
                                            onChange={this.updateInputValue}
                                        />
                                    </FormGroup>
                                    <Button
                                        type="submit"
                                        size="md"
                                        color="success"
                                        block
                                        disabled={resource_unchanged || creating_resource}
                                        onClick={this.handleCreateResource}
                                    >
                                        <i className={createButtonIconClassName}></i>
                                        {' '}
                                        Create
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {
        resource,
        created
    } = state.users;
    const errors = getApiErrorMessages(state.users.error);
    const role_errors = getApiErrorMessages(state.roles.error);

    return {
        errors: errors,
        resource: typeof resource === 'undefined' ? null : resource,
        role_errors: role_errors,
        roles: state.roles.resources,
        token: state.auth.token,
        created: created
    };
};

const mapDispatchToProps = (dispatch) => ({
    clearMetadataResourceCreate() {
        dispatch({
            type: 'CLEAR_METADATA_USER_CREATE'
        })
    },
    createResource(data) {
        dispatch({
            type: 'CREATE_USER_REQUEST',
            payload: data
        })
    },
    getAllRoles(data) {
        dispatch({
            type: 'GET_ALL_ROLES_REQUEST',
            payload: data
        })
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
