import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import withEditResource from './withEditResource';
import ApiErrorCard from '../../Cards/ApiErrorCard';
import CreateSeoEntry from '../CreateSeoEntry';
import ResourceForm from '../ResourceForm';
import { getApiErrorMessages } from '../../../helpers/apiMessages';
import { apiResourceCreateSuccessNotification } from '../../../helpers/toastNotification';
import {
    clearMetadataResourceEdit,
    createResource,
    destroyResource,
    updateResource,
} from '../../../redux/seoEntries/actions';
import {
    attributesSequenceToShow,
    nameField,
    reducerName,
    resourceDisplayName,
    schema,
} from '../../../redux/seoEntries/schema';
import { setResource } from '../../../redux/seoEntries/actions';

class SeoTabContent extends Component {
    constructor(props) {
        super(props);

        this.handleCreateResource = this.handleCreateResource.bind(this);

        this.state = {
            creatingResource: false,
        };
    }

    handleCreateResource(evt) {
        evt.preventDefault();

        this.setState({
            creatingResource: true,
        });

        const { createResource, token, parentResourceTableName, urlParams } = this.props;
        const data = {
            token,
            target_id: urlParams.id,
            target_table: parentResourceTableName,
        };
        createResource({ data })
    }

    componentDidMount() {
        const { parentResource, setResource } = this.props;

        if(parentResource.seo_entry) {
            const data = {
                resource: {...parentResource.seo_entry},
            };
            setResource({ data });
        }
    }

    componentDidUpdate(prevProps) {
        const { created, errors } = this.props;

        // This means that if I was creating/updating an SEO entry,
        // And I have errors,
        // so we set the state accordingly
        if(
            (
                !prevProps.errors
                || !prevProps.errors.length
            )
            && errors
            && errors.length
            && errors.length > 0
        ) {
            this.setState({
                creatingResource: false,
            });
        }

        // This means we were creating an SEO entry
        // and it's been created correctly
        // So we set the SEO entry in state
        else if(prevProps.created === false && created === true) {
            apiResourceCreateSuccessNotification({
                resourceDisplayName,
                iconClassName: 'fa-search',
            });

            this.setState({
                creatingResource: false,
            });
        }
    }

    render() {
        const {
            errors,
            formSchema,
            handleUpdateResource,
            resource,
            parentResourceDisplayName,
            resourceUnchanged,
            updateInputValue,
            updatingResource,
        } = this.props;
        const { creatingResource } = this.state;
        const createResourceButtonIconClassName = creatingResource === true
            ? 'fa fa-fw fa-spinner fa-spin'
            : 'fa fa-fw fa-search-plus';
        const updateResourceButtonIconClassName = updatingResource === true
            ? 'fa fa-fw fa-spinner fa-spin'
            : 'fa fa-fw fa-save';

        return (
            <>
                <Row>
                    <Col className="col-md-12">
                        <ApiErrorCard errors={errors} />
                    </Col>
                </Row>
                {
                    resource
                        ? (
                            <ResourceForm
                                formSchema={formSchema}
                                isRecovering={false}
                                onInputChange={updateInputValue}
                                onSubmit={handleUpdateResource}
                                submitButtonClassName="warning"
                                submitButtonDisabled={resourceUnchanged || updatingResource}
                                submitButtonIconClassName={updateResourceButtonIconClassName}
                                submitButtonText="Update"
                            />
                        )
                        : (
                            <CreateSeoEntry
                                buttonIconClassName={createResourceButtonIconClassName}
                                creating={creatingResource}
                                handleCreate={this.handleCreateResource}
                                resourceDisplayName={parentResourceDisplayName}
                            />
                        )
                }
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { token } = state.auth;
    const {
        created,
        error,
        resource,
    } = state[reducerName];
    const errors = getApiErrorMessages(error);
    const urlParams = ownProps.match.params;

    return {
        created,
        errors,
        resource,
        token,
        urlParams,
    };
};

const mapDispatchToProps = {
    createResource,
    setResource,
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withEditResource({
        attributesSequenceToShow,
        clearMetadataResourceEdit,
        destroyResource,
        nameField,
        reducerName,
        resourceDisplayName,
        schema,
        updateResource,
        urlParamsResourceIdCheckDisabled: true,
    })(SeoTabContent)
));
