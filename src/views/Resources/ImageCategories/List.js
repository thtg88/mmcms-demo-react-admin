import React from 'react';
import ListResource, { withListResource } from '../../../components/Resources/ListResource';
import {
    changePageResources,
    clearMetadataResources,
    getPaginatedResources,
    reducerName,
} from '../../../redux/imageCategories/actions';
import {
    columns,
    pageSize,
    keyField,
    nameField,
    sortingOptions,
    defaultSortingOption,
    resourceBaseRoute,
    resourceDisplayName,
    resourcesDisplayName,
    searchColumns,
} from '../../../redux/imageCategories/schema';

export const List = ({
    current_page,
    errors,
    fetching_resources,
    history,
    isRecovering,
    onPageClick,
    onRecoverClick,
    onRecoverDoneClick,
    onSearchButtonClick,
    onSearchInputChange,
    onSearchInputClear,
    onSortDropdownItemClick,
    paginated_resources,
    query,
    searching,
    selectedSortingOption,
    total,
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
    if(isRecovering === true) {
        actions.push({
            className: 'btn-primary',
            onClick: onRecoverDoneClick,
            title: 'Complete Recovery',
            type: 'button',
            iconClassName: 'fa fa-fw fa-check',
        });
    } else {
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
            actions={actions}
            columns={columns}
            currentPage={current_page}
            errors={errors}
            fetchingResources={fetching_resources}
            history={history}
            keyField={keyField}
            listgroupItemTag="button"
            listType="list"
            nameField={nameField}
            onPageClick={onPageClick}
            onSearchButtonClick={onSearchButtonClick}
            onSearchInputChange={onSearchInputChange}
            onSearchInputClear={onSearchInputClear}
            onSortDropdownItemClick={onSortDropdownItemClick}
            pageSize={pageSize}
            resourceBaseRoute={reducerName}
            resources={paginated_resources}
            resourcesDisplayName={resourcesDisplayName}
            searchEnabled={true}
            searching={searching}
            searchQuery={query}
            searchTextInputPlaceholder={`Search by ${searchColumns.join(', or ')}`}
            selectedSortingOption={selectedSortingOption}
            sortingEnabled={true}
            sortingOptions={sortingOptions}
            total={total}
            urlBuilder={(entity) => history.push(`/${resourceBaseRoute}/${entity.id}${isRecovering === true ? '?recovery=1' : ''}`)}
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
