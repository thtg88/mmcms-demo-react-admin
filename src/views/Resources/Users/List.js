import React from 'react';
import ListResource, { withListResource } from '../../../components/Resources/ListResource';
import reducerRegistry from '../../../redux/reducerRegistry';
import sagaRegistry from '../../../redux/sagaRegistry';
import {
    changePageResources,
    clearMetadataResources,
    getPaginatedResources,
    reducerName,
} from '../../../redux/users/actions';
import reducer from '../../../redux/users/reducers';
import sagas from '../../../redux/users/sagas';
import {
    columns,
    defaultSortingOption,
    keyField,
    nameField,
    pageSize,
    resourceDisplayName,
    resourcesDisplayName,
    searchColumns,
    sortingOptions,
} from '../../../redux/users/schema';

reducerRegistry.register(reducerName, reducer);
sagaRegistry.register(reducerName, sagas);

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
            href: '/'+reducerName+'/create',
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
        urlBuilder={(entity) => history.push(`/${reducerName}/${entity.id}${isRecovering === true ? '?recovery=1' : ''}`)}
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
    resourceBaseRoute: reducerName,
    reducerName,
})(List);
