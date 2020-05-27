import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import EditResourceContainer, { withEditResource } from '../../../components/Resources/EditResource';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    recoverResource,
    updateResource,
} from '../../../redux/contentModels/actions';
import reducers from '../../../redux/contentModels/reducers';
import sagas from '../../../redux/contentModels/sagas';
import {
    attributesSequenceToShow,
    canDestroy,
    canRestore,
    canUpdate,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentModels/schema';

export const Edit = ({
    gettingResource,
    isRecovering,
    resource,
    toggleDestroyResourceModal,
    toggleRecoverResourceModal,
    ...props
}) => {
    const actions = [];
    if(isRecovering === true && canRestore === true) {
        actions.push({
            className: 'btn-success',
            disabled: gettingResource,
            iconClassName: 'fa fa-fw fa-check',
            onClick: toggleRecoverResourceModal,
            title: 'Recover '+resourceDisplayName,
            type: 'button',
        });
    } else if(canDestroy === true) {
        actions.push({
            className: 'btn-danger',
            disabled: gettingResource,
            iconClassName: 'fa fa-trash',
            onClick: toggleDestroyResourceModal,
            title: 'Remove '+resourceDisplayName,
            type: 'button',
        });
    }

    const tabs = [];
    if (resource) {
        tabs.push({
            name: 'content-fields',
            navContent: (
                <NavLink
                    tag={Link}
                    to={`/content-models/${resource.id}/content-fields`}
                >
                    <i className="fa fa-fw fa-th-list"></i>
                    {' '}
                    Fields
                </NavLink>
            ),
        });
    }

    return (
        <EditResourceContainer
            {...props}
            actions={actions}
            canDestroy={canDestroy}
            canUpdate={canUpdate}
            gettingResource={gettingResource}
            isRecovering={isRecovering}
            resource={resource}
            resourceBaseRoute={resourceBaseRoute}
            resourceDisplayName={resourceDisplayName}
            resourceNameField={nameField}
            tabs={tabs}
            toggleDestroyResourceModal={toggleDestroyResourceModal}
            toggleRecoverResourceModal={toggleRecoverResourceModal}
        />
    );
};

export default withEditResource({
    attributesSequenceToShow,
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    nameField,
    pageSize,
    recoverResource,
    reducerName,
    reducers,
    resourceBaseRoute,
    resourceDisplayName,
    sagas,
    schema,
    updateResource,
})(Edit);
