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
import ApiErrorCard from '../../ApiErrorCard';
import ApiResourceUpdateSuccessCard from '../../ApiResourceUpdateSuccessCard';
import SpinnerLoader from '../../SpinnerLoader';
import { getApiErrorMessages, isUnauthenticatedError } from '../../../helpers/apiErrorMessages';
import notification from '../../../helpers/notification';

class Profile extends Component {
    state = {
        getting_profile: false,
        profile: null,
        profile_unchanged: true,
        updating_profile: false
    };

    constructor(props) {
        super(props);

        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
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

    handleUpdateProfile(evt) {
        evt.preventDefault();

        const { updateProfile, token } = this.props;
        const { profile } = this.state;
        const data = {
            email: profile.email,
            name: profile.name,
            token
        };

        this.setState({
            updating_profile: true
        });

        updateProfile({ data });
    }

    componentDidMount() {
        const data = {
            type: 'danger',
            message: 'Oh, nothing to worry about, good night :-)',
            onClose: () => console.log('closed')
        };
        notification(data);


        const { profile, token } = this.props;

        // console.log(profile);

        // If profile is already in global state
        // Avoid re-fetching
        if(profile === null) {
            const data = { token };

            this.props.getProfile({ data });

            this.setState({
                getting_profile: true
            });
        } else {
            this.setState({ profile });
        }
    }

    componentDidUpdate(prevProps) {
        const {
            errors,
            profile,
            unauthenticated,
            updated_profile
        } = this.props;
        const { getting_profile, updating_profile } = this.state;

        // console.log('prevProps', prevProps);

        // if unauthenticated redirect to login
        if(prevProps.unauthenticated === false && unauthenticated === true) {
            this.props.loggedOut();
        }

        // This means that I was updating the resource,
        // And I received errors from the store
        // So it's time to restore the Update button
        else if (
            updating_profile === true
            && typeof errors.length !== 'undefined'
            && errors.length !== 0
        ) {
            this.setState({
                getting_profile: false,
                updating_profile: false
            });
        }

        // This means that I was getting the resource,
        // And I received errors from the store
        // So it's time to restore the Update button
        else if (
            getting_profile === true
            && typeof errors.length !== 'undefined'
            && errors.length !== 0
        ) {
            this.setState({
                getting_profile: false,
                updating_profile: false
            });
        }

        // This means that I was updating or getting the resource,
        // And I received either an updated or the profile from the store
        // So it's time to restore the internal state
        else if (
            (
                updating_profile === true
                && updated_profile === true
            )
            || (
                getting_profile === true
                && prevProps.profile === null
                && profile !== null
            )
        ) {
            this.setState({
                profile,
                getting_profile: false,
                updating_profile: false
            });
        }
    }

    componentWillUnmount() {
        this.props.clearMetadataProfile();
    }

    render() {
        const { errors, updated_profile } = this.props;
        const {
            getting_profile,
            profile,
            profile_unchanged,
            updating_profile
        } = this.state;

        // console.log(this.state);
        // console.log(this.props);

        if((profile === null || typeof profile === 'undefined') && getting_profile !== true) {
            return (null);
        }

        let updateButtonIconClassName = "fa fa-check";
        if(updating_profile === true) {
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
                        <ApiResourceUpdateSuccessCard success={updated_profile} resourceDisplayName="Profile" />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <strong>Edit Profile</strong>
                            </CardHeader>
                            <CardBody>
                                {getting_profile
                                    ? <SpinnerLoader />
                                    : <Form onSubmit={() => this.handleUpdateProfile()}>
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
                                            type="submit"
                                            size="md"
                                            color="success"
                                            block
                                            disabled={profile_unchanged || updating_profile}
                                            onClick={this.handleUpdateProfile}
                                        >
                                            <i className={updateButtonIconClassName}></i>
                                            {' '}
                                            Update
                                        </Button>
                                    </Form>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        error,
        token,
        updated_profile,
        user
    } = state.auth;
    const errors = getApiErrorMessages(error);
    const unauthenticated = isUnauthenticatedError(error);

    return {
        errors: errors,
        profile: typeof user === 'undefined' ? null : user,
        token: token,
        unauthenticated: unauthenticated,
        updated_profile: updated_profile
    }
};

const mapDispatchToProps = (dispatch) => ({
    clearMetadataProfile(data) {
        dispatch({
            type: 'CLEAR_METADATA_PROFILE'
        })
    },
    getProfile(data) {
        dispatch({
            type: 'GET_PROFILE_REQUEST',
            payload: data
        })
    },
    loggedOut(data) {
        dispatch({
            type: 'LOGGED_OUT',
            payload: data
        })
    },
    updateProfile(data) {
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
