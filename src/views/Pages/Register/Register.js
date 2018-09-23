import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';
import getApiErrorMessages from '../../../helpers/getApiErrorMessages';
import ApiErrorAlert from '../../ApiErrorAlert';

class Register extends Component {
    state = {
        redirect_login: false,
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
    };

    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    redirectLogin() {
        const { resetError, errors } = this.props;

        if(errors.length > 0) {
            resetError();
        }

        this.setState({
            redirect_login: true
        });
    }

    handleRegister(evt) {
        evt.preventDefault();

        const { resetError, errors, register } = this.props;
        const { email, name, password, password_confirmation } = this.state;
        const data = { email, name, password, password_confirmation };

        console.log(data);

        if(errors.length > 0) {
            resetError();
        }

        register({ data });
    };

    updateInputValue(evt) {
        const { resetError, errors } = this.props;

        if(errors.length > 0) {
            resetError();
            console.log('reset error');
        }

        console.log('updating state: ', [evt.target.name], evt.target.value);

        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    render() {
        const { redirect_login } = this.state;
        const { errors, registering, logged_in } = this.props;

        if(redirect_login === true) {
            return <Redirect to="/login" />
        }

        if(logged_in === true) {
            return <Redirect to="/" />
        }

        let registerButtonIconClassName = 'fa fa-pencil-square-o';
        if(typeof registering !== 'undefined' && registering === true) {
            registerButtonIconClassName = 'fa fa-spinner fa-spin';
        }

        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1>Register</h1>
                                    <p className="text-muted">Create your account</p>
                                    <ApiErrorAlert errors={errors} />
                                    <Form onSubmit={this.handleRegister}>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                name="name"
                                                value={this.state.name}
                                                autoComplete="name"
                                                placeholder="e.g. John Smith"
                                                onChange={this.updateInputValue}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="email"
                                                name="email"
                                                value={this.state.email}
                                                autoComplete="email"
                                                placeholder="e.g. john.smith@domain.com"
                                                onChange={this.updateInputValue}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                placeholder="Password"
                                                onChange={this.updateInputValue}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="password"
                                                name="password_confirmation"
                                                value={this.state.password_confirmation}
                                                placeholder="Confirm password"
                                                onChange={this.updateInputValue}
                                            />
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button
                                                    type="submit"
                                                    color="success"
                                                    block
                                                    onClick={this.handleRegister}
                                                    disabled={registering}
                                                >
                                                    <i className={registerButtonIconClassName}></i>
                                                    {' '}
                                                    Create Account
                                                </Button>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button
                                                    color="link"
                                                    className="px-0"
                                                    onClick={() => this.redirectLogin()}
                                                >Back to Login</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const errors = getApiErrorMessages(state.auth.error);
    return {
        errors: errors,
        registering: state.auth.registering === true,
        logged_in: typeof state.auth.user !== 'undefined' && state.auth.user !== null && !isNaN(state.auth.user.id)
    }
};

const mapDispatchToProps = (dispatch) => ({
    register(data) {
        dispatch({
            type: 'REGISTER_REQUEST',
            payload: data
        });
    },
    resetError() {
        dispatch({
            type: 'REGISTER_ERROR_RESET'
        });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
