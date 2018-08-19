import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Alert,
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
import getApiErrorMessages from '../helpers/getApiErrorMessages';
import ApiErrorAlert from './ApiErrorAlert';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null,
            profile_unchanged: true
        }

        this.updateInputValue = this.updateInputValue.bind(this);
    }

    updateInputValue(evt) {
        if(this.state.profile_unchanged === true) {
            this.setState({
                profile_unchanged: false,
            });
        }
        this.setState({
            profile: {
                ...this.state.profile,
                [evt.target.name]: evt.target.value,
            }
        });
    }

    handleUpdateProfile() {
        const { updateProfile, token } = this.props;
        const { profile } = this.state;
        const data = {
            email: profile.email,
            name: profile.name,
            token
        };

        updateProfile({ data });
    }

    componentDidMount() {
        const { profile, token } = this.props;
        // If profile is already in global state
        // Avoid re-fetching
        // console.log(profile);
        if(profile === null) {
            const data = { token };
            this.props.getProfile({ data });
        } else {
            this.setState({ profile });
        }
    }

    componentDidUpdate(prevProps) {
        // console.log('prevProps', prevProps);
        if(this.props.profile !== prevProps.profile) {
            // If component is receiving props
            // Set in the state so it can be updated properly
            // avoiding blank fields for ones that do not get updated
            const { profile } = this.props;
            this.setState({ profile });
        }
    }

    render() {
        const { errors, getting_profile, updated_profile, updating_profile } = this.props;
        const { profile_unchanged, profile } = this.state;

        if(getting_profile === true) {
            return (
                <Alert color="info">
                    <div>Loading Profile...</div>
                </Alert>
            );
        }

        console.log(this.state.profile);
        console.log(this.props);

        if(profile === null) {
            return (null);
        }

        let updateButtonIconClassName;
        if(updating_profile === true) {
            updateButtonIconClassName = "fa fa-spinner fa-spin";
        } else {
            updateButtonIconClassName = "fa fa-check";
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md="12">
                        {(updated_profile === true
                        ? <Alert color="success">
                            <div><i className="fa fa-check"></i> Profile Updated!</div>
                        </Alert>
                        : null)}
                        <ApiErrorAlert errors={errors} />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <strong>Edit Profile</strong>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={profile.name}
                                            placeholder="Enter your name"
                                            onChange={this.updateInputValue}
                                        />
                                        {/*<FormFeedback>Houston, we have a problem...</FormFeedback>*/}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={profile.email}
                                            placeholder="Enter your email"
                                            onChange={this.updateInputValue}
                                        />
                                        {/*<FormFeedback>Houston, we have a problem...</FormFeedback>*/}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Role</Label>
                                        <p className="form-control-static">{(
                                            profile.role !== null
                                            ? profile.role.display_name
                                            : 'N/A'
                                        )}</p>
                                    </FormGroup>
                                    <Button
                                        type="button"
                                        size="md"
                                        color="success"
                                        block
                                        disabled={profile_unchanged || updating_profile}
                                        onClick={() => this.handleUpdateProfile()}
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const errors = getApiErrorMessages(state.auth.error);
    return {
        token: state.auth.token,
        profile: state.auth.user,
        getting_profile: state.auth.getting_profile,
        updating_profile: state.auth.updating_profile,
        updated_profile: state.auth.updated_profile,
        errors: errors
    }
};

const mapDispatchToProps = (dispatch) => ({
    getProfile(data) {
        dispatch({
            type: 'GET_PROFILE_REQUEST',
            payload: data
        })
    },
    updateProfile(data) {
        console.log('updateProfile?!?');
        dispatch({
            type: 'UPDATE_PROFILE_REQUEST',
            payload: data
        })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
