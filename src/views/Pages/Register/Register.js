import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';
import normalizeApiErrors from '../../../helpers/normalizeApiErrors';
import AuthErrorAlert from '../AuthErrorAlert';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect_login: false,
            email: '',
            name: '',
            password: '',
            password_confirmation: ''
        };

        this.updateInputValue = this.updateInputValue.bind(this);
    }

    redirectLogin() {
        const { resetError } = this.props;
        const { errors } = this.props;
        if(errors.length > 0) {
            resetError();
        }
        this.setState({
            redirect_login: true
        });
    }

    handleRegister() {
        const { resetError } = this.props;
        const { errors } = this.props;
        if(errors.length > 0) {
            resetError();
        }
        const { register } = this.props;
        const { email, name, password, password_confirmation } = this.state;
        const data = { email, name, password, password_confirmation };
        console.log(data);
        register({ data });
    };

    updateInputValue(evt) {
        const { resetError } = this.props;
        const { errors } = this.props;
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
        if(this.state.redirect_login === true) {
            return <Redirect to="/login" />
        }

        const { errors } = this.props;

        const { loading } = this.props;
        let registerButtonIconClassName = 'fa fa-pencil-square-o';
        if(typeof loading !== 'undefined' && loading === true) {
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
                                    <AuthErrorAlert errors={errors} />
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
                                                color="success"
                                                block
                                                onClick={() => this.handleRegister()}
                                                disabled={loading}
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
    const errors = normalizeApiErrors(state.auth.error);
    return {
        errors: errors,
        loading: state.auth.loading === true,
        isLoggedIn: typeof state.auth.token !== 'undefined' && state.auth.token !== null
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
            type: 'AUTH_RESET_ERROR'
        });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
