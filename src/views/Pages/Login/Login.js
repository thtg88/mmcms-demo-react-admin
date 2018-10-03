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
import { getApiErrorMessages } from '../../../helpers/apiErrorMessages';
import ApiErrorAlert from '../../ApiErrorAlert';
import LoggedOutAlert from '../../LoggedOutAlert';

class Login extends Component {
    state = {
        redirect_register: false,
        email: '',
        password: ''
    };

    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    redirectRegister() {
        const { resetError, errors } = this.props;

        if(errors.length > 0) {
            resetError();
        }

        this.setState({
            redirect_register: true
        });
    }

    handleLogin(evt) {
        evt.preventDefault();

        const { resetError, errors, login } = this.props;
        const { email, password } = this.state;
        const data = { email, password };

        // console.log(data);

        if(errors.length > 0) {
            resetError();
        }

        login({ data });
    };

    updateInputValue(evt) {
        const { resetError, errors } = this.props;

        if(errors.length > 0) {
            resetError();
            // console.log('reset error');
        }

        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    render() {
        const {
            errors,
            logged_in,
            logged_out,
            logging_in
        } = this.props;
        const { redirect_register } = this.state;

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
                        <Col md="6">
                            <Card className="p-2">
                                <CardBody>
                                    <Form innerRef={"login-form"}>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <LoggedOutAlert logged_out={logged_out} />
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
                                                    className="px-2"
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
                                                <Button
                                                    color="link"
                                                    className="px-0"
                                                    onClick={() => this.redirectRegister()}
                                                >Sign up</Button>
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
    const {
        error,
        logged_out,
        logging_in,
        token
    } = state.auth;

    const errors = getApiErrorMessages(error);

    return {
        errors: errors,
        logged_in: typeof token !== 'undefined' && token !== null && typeof token.access_token !== 'undefined',
        logged_out: logged_out === true,
        logging_in: logging_in === true,
    };
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
