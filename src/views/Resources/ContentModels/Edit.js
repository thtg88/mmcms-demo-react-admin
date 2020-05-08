import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import EditResourceContainer, { withEditResource } from '../../../components/Resources/EditResource';
import {
    clearMetadataResourceEdit,
    destroyResource,
    findResource,
    getPaginatedResources,
    updateResource,
} from '../../../redux/contentModels/actions';
import reducers from '../../../redux/contentModels/reducers';
import sagas from '../../../redux/contentModels/sagas';
import {
    attributesSequenceToShow,
    canDestroy,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    schema,
} from '../../../redux/contentModels/schema';

export const Edit = ({
    gettingResource,
    resource,
    toggleDestroyResourceModal,
    ...props
}) => {
    const actions = [];
    if(canDestroy === true) {
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
            gettingResource={gettingResource}
            resource={resource}
            resourceBaseRoute={resourceBaseRoute}
            resourceDisplayName={resourceDisplayName}
            resourceNameField={nameField}
            tabs={tabs}
            toggleDestroyResourceModal={toggleDestroyResourceModal}
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
    reducerName,
    reducers,
    resourceBaseRoute,
    resourceDisplayName,
    sagas,
    schema,
    updateResource,
})(Edit);
