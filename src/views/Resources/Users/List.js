import React from 'react';
import IndexResource from '../IndexResource';
import withListResource from '../withListResource';
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
    pageSize,
    keyField,
    nameField,
    sortingOptions,
    defaultSortingOption,
    searchColumns,
} from './tableConfig';

reducerRegistry.register(reducerName, reducer);
sagaRegistry.register(reducerName, sagas);

const resourcesName = 'Users';

const actions = [
    {
        className: 'btn-success',
        href: '/'+reducerName+'/create',
        title: 'New Resource',
        type: 'link',
        iconClassName: 'fa fa-plus',
    },
];

export const List = ({
    current_page,
    errors,
    fetching_resources,
    history,
    isSortDropdownOpen,
    onPageClick,
    onSearchButtonClick,
    onSearchInputChange,
    onSearchInputClear,
    onSortDropdownItemClick,
    resources,
    query,
    searching,
    selectedSortingOption,
    toggleSortDropdown,
    total,
}) => {
    return (
        <IndexResource
            actions={actions}
            columns={columns}
            currentPage={current_page}
            errors={errors}
            fetchingResources={fetching_resources}
            history={history}
            isSortDropdownOpen={isSortDropdownOpen}
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
            resources={resources}
            resourcesName={resourcesName}
            searchEnabled={true}
            searching={searching}
            searchQuery={query}
            searchTextInputPlaceholder={`Search by ${searchColumns.join(', or ')}`}
            selectedSortingOption={selectedSortingOption}
            sortButtonDisabled={fetching_resources}
            sortingEnabled={true}
            sortingOptions={sortingOptions}
            toggleSortDropdown={toggleSortDropdown}
            total={total}
            urlBuilder={(entity) => '/'+reducerName+'/'+entity.id}
        />
    );
};

export default withListResource(
    List,
    {
        changePageResources,
        clearMetadataResources,
        defaultSortingOption,
        getPaginatedResources,
        pageSize,
        sortingOptions,
        resourceBaseRoute: reducerName,
        subStateName: reducerName,
    }
);
