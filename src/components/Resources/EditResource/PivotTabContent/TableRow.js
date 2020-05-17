import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import DestroyResourceModal from '../../DestroyResourceModal';
import { getApiErrorMessages } from '../../../../helpers/apiMessages';
import { apiResourceDestroySuccessNotification } from '../../../../helpers/toastNotification';

class TableRow extends Component {
    constructor(props) {
        super(props);

        this.handleDestroyResource = this.handleDestroyResource.bind(this);
        this.toggleDestroyResourceModal = this.toggleDestroyResourceModal.bind(this);

        this.state = {
            destroyingResource: false,
            isDestroyResourceModalOpen: false,
        };
    }

    handleDestroyResource(evt) {
        evt.preventDefault();

        const { destroyResource, token, resource } = this.props;
        const data = {
            token,
            id: resource.id,
        };

        this.setState({
            destroyingResource: true,
        });

        destroyResource({ data });
    }

    toggleDestroyResourceModal(evt) {
        const { setResource, childResource } = this.props;
        const { isDestroyResourceModalOpen } = this.state;

        evt.preventDefault();

        this.setState({
            isDestroyResourceModalOpen: !isDestroyResourceModalOpen,
        });

        const data = {
            resource: {...childResource},
        };
        setResource({ data });
    }

    componentDidUpdate(prevProps) {
        const {
            destroyed,
            errors,
            relationshipName,
            resource,
            resourceDisplayName,
            unsetRelationshipItem,
        } = this.props;
        const { destroyingResource } = this.state;

        // This means that I was destroying the resource,
        // And I received a destroyed from the store
        // So restore the state - this will trigger a re-render
        // which will redirect us to the index
        if(
            typeof errors !== 'undefined'
            && typeof errors.length !== 'undefined'
            && errors.length === 0
            && destroyingResource === true
            && destroyed === true
        ) {
            apiResourceDestroySuccessNotification({ resourceDisplayName });

            this.setState({
                destroyingResource: false,
                isDestroyResourceModalOpen: false,
            });

            const data = {
                relationshipName,
                id: resource.id,
            };
            unsetRelationshipItem({ data });
        }

        // This means that if I was destroying the resource,
        // And I have errors,
        // close the modal and show them
        else if(
            typeof errors !== 'undefined'
            && typeof errors.length !== 'undefined'
            && errors.length > 0
            && destroyingResource === true
        ) {
            this.setState({
                destroyingResource: false,
                isDestroyResourceModalOpen: false,
            });
        }
    }

    render() {
        const {
            childResource,
            destinationBaseRoute,
            destinationRelationshipName,
            resourceDisplayName,
        } = this.props;
        const { isDestroyResourceModalOpen, destroyingResource } = this.state;

        if(!childResource) {
            return null;
        }

        const removeButtonIconClassName = destroyingResource === true
            ? 'fa fa-fw fa-spin fa-spinner'
            : 'fa fa-fw fa-times';
        const removeButtonText = destroyingResource === true
            ? 'Removing...'
            : 'Remove';

        return (
            <tr>
                <td>
                    {
                        childResource[destinationRelationshipName]
                            ? (
                                <Link to={
                                    `/${destinationBaseRoute}/${
                                    childResource[destinationRelationshipName].id
                                    }`
                                }>
                                    {childResource[destinationRelationshipName].name}
                                </Link>
                            )
                            : 'N/A'
                    }
                </td>
                <td>
                    <Button
                        type="button"
                        color="danger"
                        disabled={destroyingResource}
                        onClick={this.toggleDestroyResourceModal}
                        size="sm"
                        block
                    >
                        <i className={removeButtonIconClassName}></i>
                        {` ${removeButtonText}`}
                    </Button>
                    <DestroyResourceModal
                        destroyButtonIconClassName={removeButtonIconClassName}
                        disabled={destroyingResource}
                        isOpen={isDestroyResourceModalOpen}
                        onDestroyButtonClick={this.handleDestroyResource}
                        resourceDisplayName={resourceDisplayName}
                        toggle={this.toggleDestroyResourceModal}
                    />
                </td>
            </tr>
        );
    }
}

TableRow.propTypes = {
    childResource: PropTypes.shape({
        id: PropTypes.number,
        product: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        }),
    }),
};

const mapStateToProps = (state, ownProps) => {
    const { token } = state.auth;
    const {
        destroyed,
        error,
        resource,
    } = state[ownProps.reducerName];
    const errors = getApiErrorMessages(error);

    return {
        destroyed,
        errors,
        resource,
        token,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    destroyResource: ownProps.destroyResource,
    setResource: ownProps.setResource,
    unsetRelationshipItem: ownProps.unsetRelationshipItem,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableRow);
