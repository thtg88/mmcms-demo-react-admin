import React from 'react';
import ListResource, { withListResource } from '../../../components/Resources/ListResource';
import {
    changePageResources,
    clearMetadataResources,
    getPaginatedResources,
} from '../../../redux/imageCategories/actions';
import {
    canRestore,
    columns,
    defaultSortingOption,
    keyField,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    resourcesDisplayName,
    searchTextInputPlaceholder,
    sortingOptions,
} from '../../../redux/imageCategories/schema';

export const List = ({
    fetching_resources,
    isRecovering,
    onRecoverClick,
    onRecoverDoneClick,
    page,
    paginated_resources,
    query,
    ...props
}) => {
    const actions = [
        {
            className: 'btn-success',
            href: '/'+resourceBaseRoute+'/create',
            title: 'New '+resourceDisplayName,
            type: 'link',
            iconClassName: 'fa fa-plus',
        },
    ];
    if(isRecovering === true && canRestore === true) {
        actions.push({
            className: 'btn-primary',
            onClick: onRecoverDoneClick,
            title: 'Complete Recovery',
            type: 'button',
            iconClassName: 'fa fa-fw fa-check',
        });
    } else if (canRestore === true) {
        actions.push({
            className: 'btn-warning',
            onClick: onRecoverClick,
            title: 'Recover Deleted',
            type: 'button',
            iconClassName: 'fa fa-fw fa-recycle',
        });
    }

    return (
        <ListResource
            {...props}
            actions={actions}
            columns={columns}
            currentPage={page}
            fetchingResources={fetching_resources}
            keyField={keyField}
            listgroupItemTag="button"
            listType="list"
            nameField={nameField}
            pageSize={pageSize}
            resourceBaseRoute={resourceBaseRoute}
            resources={paginated_resources}
            resourcesDisplayName={resourcesDisplayName}
            searchEnabled={true}
            searchQuery={query}
            searchTextInputPlaceholder={searchTextInputPlaceholder}
            sortingOptions={sortingOptions}
            urlBuilder={(entity) => props.history.push(`/${resourceBaseRoute}/${entity.id}${isRecovering === true ? '?recovery=1' : ''}`)}
        />
    );
};

export default withListResource({
    changePageResources,
    clearMetadataResources,
    defaultSortingOption,
    getPaginatedResources,
    pageSize,
    resourceDisplayName,
    sortingOptions,
    resourceBaseRoute,
    reducerName,
})(List);
