import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Button,
	Card,
	CardBody,
	CardGroup,
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

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect_register: false,
            email: '',
            password: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    redirectRegister() {
        const { resetError } = this.props;
        const { errors } = this.props;
        if(errors.length > 0) {
            resetError();
        }
        this.setState({
            redirect_register: true
        });
    }

    handleLogin(evt) {
        evt.preventDefault();

        const { resetError } = this.props;
        const { errors } = this.props;
        const { login } = this.props;
        const { email, password } = this.state;
        const data = { email, password };

        console.log(data);

        if(errors.length > 0) {
            resetError();
        }

        login({ data });
    };

    updateInputValue(evt) {
        const { resetError } = this.props;
        const { errors } = this.props;

        if(errors.length > 0) {
            resetError();
            // console.log('reset error');
        }

        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    render() {
        const { redirect_register } = this.state;
        const { logging_in, errors, logged_in } = this.props;

        // console.log('rendering...');

        if(redirect_register === true) {
            return <Redirect to="/register" />
        }

        if(logged_in === true) {
            return <Redirect to="/" />
        }

        let loginButtonIconClassName = 'fa fa-sign-in';
        if(typeof logging_in !== 'undefined' && logging_in === true) {
            loginButtonIconClassName = 'fa fa-spinner fa-spin';
        }

        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form innerRef={"login-form"}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <ApiErrorAlert errors={errors} />
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>@</InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    placeholder="e.g. john.smith@domain.com"
                                                    autoComplete="email"
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
                                                    name="password"
                                                    placeholder="Password"
                                                    autoComplete="current-password"
                                                    onChange={this.updateInputValue}
                                                />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        className="px-4"
                                                        disabled={logging_in}
                                                        onClick={this.handleLogin}
                                                        block
                                                    >
                                                        <i className={loginButtonIconClassName}></i>
                                                        {" "}
                                                        Login
                                                    </Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    {/*<Button color="link" className="px-0">Forgot password?</Button>*/}
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                            labore et dolore magna aliqua.</p>
                                            <Button
                                                color="primary"
                                                className="mt-3"
                                                active
                                                onClick={() => this.redirectRegister()}
                                            >Register Now!</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
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
        logging_in: state.auth.logging_in === true,
        logged_in: typeof state.auth.token !== 'undefined' && state.auth.token !== null && typeof state.auth.token.access_token !== 'undefined'
    }
};

const mapDispatchToProps = (dispatch) => ({
    login(data) {
        dispatch({
            type: 'LOGIN_REQUEST',
            payload: data
        });
    },
    resetError() {
        dispatch({
            type: 'LOGIN_ERROR_RESET'
        });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
