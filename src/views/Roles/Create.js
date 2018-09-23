import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import getApiErrorMessages from '../../helpers/getApiErrorMessages';

class Create extends Component {
    state = {
        resource: {
            display_name: '',
            name: '',
            priority: '',
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
            this.props.history.push('/roles/'+resource.id)
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
                                    <i className="fa fa-black-tie"></i>
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
                                        <Label htmlFor="display_name">Display Name</Label>
                                        <Input
                                            type="text"
                                            id="display_name"
                                            name="display_name"
                                            value={this.state.resource.display_name}
                                            placeholder="Enter your display name"
                                            onChange={this.updateInputValue}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="priority">Priority</Label>
                                        <Input
                                            type="number"
                                            id="priority"
                                            name="priority"
                                            value={this.state.resource.priority}
                                            placeholder="Enter your priority"
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
    const errors = getApiErrorMessages(state.roles.error);
    const {
        created,
        resource
    } = state.roles;

    return {
        created: created,
        errors: errors,
        resource: typeof resource === 'undefined' ? null : resource,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => ({
    clearMetadataResourceCreate() {
        dispatch({
            type: 'CLEAR_METADATA_ROLE_CREATE'
        })
    },
    createResource(data) {
        dispatch({
            type: 'CREATE_ROLE_REQUEST',
            payload: data
        })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
