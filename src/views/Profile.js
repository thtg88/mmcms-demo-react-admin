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
import ApiErrorCard from './ApiErrorCard';
import ApiResourceUpdateSuccessCard from './ApiResourceUpdateSuccessCard';
import SpinnerLoader from './SpinnerLoader';
import { getApiErrorMessages } from '../helpers/apiErrorMessages';

class Profile extends Component {
    state = {
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
        const { profile, token } = this.props;

        // If profile is already in global state
        // Avoid re-fetching
        // console.log(profile);
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
        // console.log('prevProps', prevProps);

        if(this.props.profile !== prevProps.profile) {
            // If component is receiving props
            // Set in the state so it can be updated properly
            // avoiding blank fields for ones that do not get updated
            const { profile } = this.props;

            this.setState({
                profile,
                getting_profile: false,
                updating_profile: false
            });
        }

        if(this.props.errors.length !== 0 && this.state.updating_profile === true) {
            this.setState({
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

        if(profile === null && getting_profile !== true) {
            return (null);
        }

        let updateButtonIconClassName = "fa fa-check";
        if(updating_profile === true) {
            updateButtonIconClassName = "fa fa-spinner fa-spin";
        }

        throw new Error('lol');

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
    const errors = getApiErrorMessages(state.auth.error);
    return {
        token: state.auth.token,
        profile: state.auth.user,
        updated_profile: state.auth.updated_profile,
        errors: errors
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
