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
import ReCAPTCHA from "react-google-recaptcha";
import ApiErrorAlert from '../../Alerts/ApiErrorAlert';
import { getApiErrorMessages } from '../../../helpers/apiErrorMessages';
import { register, resetRegisterError } from '../../../redux/auth/actions';

export class Register extends Component {
    state = {
        redirect_login: false,
        email: '',
        g_recaptcha_response: null,
        name: '',
        password: '',
        password_confirmation: '',
        recaptcha: null
    };

    constructor(props) {
        super(props);

        const { REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY } = process.env;

        this.handleRegister = this.handleRegister.bind(this);
        if(
            typeof REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY !== 'undefined'
            && REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY !== null
            && REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY !== ''
        ) {
            this.assignRecaptcha = this.assignRecaptcha.bind(this);
            this.reCaptchaOnChange = this.reCaptchaOnChange.bind(this);
        }

        this.updateInputValue = this.updateInputValue.bind(this);
    }

    assignRecaptcha(el) {
        if(this.state.recaptcha === null) {
            this.setState({
                recaptcha: el
            });
        }
    }

    reCaptchaOnChange(value) {
        // console.log("Captcha value:", value);
        this.setState({
            g_recaptcha_response: value
        })
    }

    redirectLogin() {
        const { resetRegisterError, errors } = this.props;

        if(errors.length > 0) {
            resetRegisterError();
        }

        this.setState({
            redirect_login: true
        });
    }

    handleRegister(evt) {
        evt.preventDefault();

        const {
            errors,
            register,
            resetRegisterError
        } = this.props;
        const {
            email,
            g_recaptcha_response,
            name,
            password,
            password_confirmation
        } = this.state;
        const data = {
            email,
            g_recaptcha_response,
            name,
            password,
            password_confirmation
        };

        // console.log(data);

        if(errors.length > 0) {
            resetRegisterError();
        }

        register({ data });
    };

    updateInputValue(evt) {
        const { errors, resetRegisterError } = this.props;

        if(errors.length > 0) {
            resetRegisterError();
        }

        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    componentDidUpdate(prevProps) {
        if(typeof errors !== 'undefined') {
            if(
                prevProps.errors.length !== this.props.errors.length
                && this.props.errors.length > 0
            ) {
                if(this.state.recaptcha !== null) {
                    console.log('resetting recaptcha');

                    this.state.recaptcha.reset();
                }
            }
        }
    }

    render() {
        const { REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY } = process.env;
        const { errors, registering, logged_in } = this.props;
        const { redirect_login } = this.state;

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
                                        {(
                                            typeof REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY !== 'undefined'
                                            && REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY !== null
                                            && REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY !== ''
                                        )
                                            ? <Row>
                                                <Col md="12" className="mb-3 text-center">
                                                    <div style={{margin: '0 auto', display: 'inline-block'}}>
                                                        <ReCAPTCHA
                                                            ref={this.assignRecaptcha}
                                                            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                                                            onChange={this.reCaptchaOnChange}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            : null
                                        }
                                        <Row>
                                            <Col md="6">
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
                                            <Col md="6" className="text-right">
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
    const {
        error,
        registering,
        user
    } = state.auth;
    const errors = getApiErrorMessages(error);

    return {
        errors: errors,
        registering: registering === true,
        logged_in: typeof user !== 'undefined' && user !== null && !isNaN(user.id)
    };
};

const mapDispatchToProps = {
    register,
    resetRegisterError
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
