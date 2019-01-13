import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import {
    Card,
    CardBody,
    Col,
    Row,
} from 'reactstrap';
import ApiErrorCard from '../../Cards/ApiErrorCard';
import PageTitle from '../../PageTitle';
import ResourceForm from '../../Resources/ResourceForm';
import SpinnerLoader from '../../SpinnerLoader';
import { getApiErrorMessages } from '../../../helpers/apiErrorMessages';
import {
    getFormResourceFromValues,
    getValidationSchemaFromFormResource,
    getValuesFromFormResource,
    updateFormResourceFromErrors,
} from '../../../helpers/formResources';
import { apiResourceUpdateSuccessNotification } from '../../../helpers/toastNotification';
import {
    clearMetadataProfile,
    getProfile,
    updateProfile,
} from '../../../redux/auth/actions';
import schema from '../../../redux/users/schema';

export class Profile extends Component {
    state = {
        getting_profile: false,
        profile: null,
        profile_unchanged: true,
        updating_profile: false,
    };

    constructor(props) {
        super(props);

        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    updateInputValue(evt) {
        const { profile, profile_unchanged } = this.state;
        const { target } = evt;

        if(profile_unchanged === true) {
            this.setState({
                profile_unchanged: false,
            });
        }

        this.setState({
            profile: {
                ...profile,
                [target.name]: {
                    ...profile[target.name],
                    value: target.value
                },
            }
        });
    }

    async handleUpdateProfile(evt) {
        evt.preventDefault();

        const { updateProfile, token } = this.props;
        const { profile } = this.state;
        const values = getValuesFromFormResource(profile);
        const validationSchema = getValidationSchemaFromFormResource(profile);
        const data = {
            token,
            ...values,
        };

        // Reset errors
        this.setState({
            profile: updateFormResourceFromErrors(profile, {inner:[]}),
        });

        await yup.object(validationSchema)
            .validate(
                values,
                { abortEarly: false }
            )
            .then(() => {
                // If validation passes
                // Update profile

                this.setState({
                    updating_profile: true,
                });

                updateProfile({ data });
            })
            .catch((errors) => {
                // If validation does not passes
                // Set errors in the form
                this.setState({
                    profile: updateFormResourceFromErrors(profile, errors),
                });
            });
    }

    componentDidMount() {
        const {
            getProfile,
            profile,
            token,
        } = this.props;

        // If profile is already in global state
        // Avoid re-fetching
        if(profile === null) {
            const data = { token };

            this.setState({
                getting_profile: true,
            });

            getProfile({ data });

        } else {
            this.setState({
                profile: getFormResourceFromValues(profile, schema),
            });
        }
    }

    componentDidUpdate(prevProps) {
        const {
            errors,
            profile,
            updated_profile,
        } = this.props;
        const { getting_profile, updating_profile } = this.state;

        // This means that I was updating the resource,
        // And I received errors from the store
        // So it's time to restore the Update button
        if(
            updating_profile === true
            && typeof errors.length !== 'undefined'
            && errors.length !== 0
        ) {
            this.setState({
                getting_profile: false,
                updating_profile: false,
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
                updating_profile: false,
            });
        }

        // This means that I was getting the resource,
        // And I received  the profile from the store
        // So it's time to restore the internal state
        else if (
            getting_profile === true
            && prevProps.profile === null
            && profile !== null
        ) {
            this.setState({
                profile: getFormResourceFromValues(profile, schema),
                getting_profile: false,
                updating_profile: false,
            });
        }

        // This means that I was updating the resource,
        // And I received either an updated profile from the store
        // So it's time to restore the internal state
        else if (
            updating_profile === true
            && updated_profile === true
        ) {
            apiResourceUpdateSuccessNotification({
                resourceDisplayName: 'Profile'
            });

            this.setState({
                getting_profile: false,
                updating_profile: false,
            });
        }
    }

    componentWillUnmount() {
        const { clearMetadataProfile } = this.props;

        if(typeof clearMetadataProfile !== 'undefined') {
            clearMetadataProfile();
        }
    }

    render() {
        const { errors } = this.props;
        const {
            getting_profile,
            profile,
            profile_unchanged,
            updating_profile,
        } = this.state;
        const updateButtonIconClassName = updating_profile === true
            ? 'fa fa-spinner fa-spin'
            : 'fa fa-save';
        const profileTitle = getting_profile
            ? 'Loading...'
            : 'Edit Profile';

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col className="col-md-12">
                        <ApiErrorCard errors={errors} />
                    </Col>
                </Row>
                {
                    (
                        (
                            typeof profile === 'undefined'
                            || profile === null
                            || (
                                Object.keys(profile).length === 0
                                && profile.constructor === Object
                            )
                        )
                        && getting_profile !== true
                    )
                    ? null
                    : (
                        <>
                            <PageTitle text={profileTitle} />
                            <Row>
                                <Col className="col-md-12">
                                    <Card className="card-accent-warning">
                                        <CardBody>
                                        {
                                            getting_profile
                                                ? <SpinnerLoader />
                                                : <ResourceForm
                                                    onInputChange={this.updateInputValue}
                                                    onSubmit={this.handleUpdateProfile}
                                                    resource={profile}
                                                    submitButtonClassName="warning"
                                                    submitButtonDisabled={profile_unchanged || updating_profile}
                                                    submitButtonIconClassName={updateButtonIconClassName}
                                                    submitButtonText="Update"
                                                />
                                            }
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        error,
        token,
        updated_profile,
        user,
    } = state.auth;
    const errors = getApiErrorMessages(error);

    return {
        errors,
        token,
        updated_profile,
        profile: typeof user === 'undefined' ? null : user,
    };
};

const mapDispatchToProps = {
    clearMetadataProfile,
    getProfile,
    updateProfile,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
