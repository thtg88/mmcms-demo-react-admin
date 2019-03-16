import React from 'react';
import ListResource from '../../../components/Resources/ListResource';
import withListResource from '../../../components/Resources/ListResource/withListResource';
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
    resourcesName,
    sortingOptions,
    searchColumns,
} from '../../../redux/users/schema';

reducerRegistry.register(reducerName, reducer);
sagaRegistry.register(reducerName, sagas);

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
    paginated_resources,
    query,
    searching,
    selectedSortingOption,
    toggleSortDropdown,
    total,
}) => {
    return (
        <ListResource
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
            paginated_resources={paginated_resources}
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
            urlBuilder={(entity) => history.push('/'+reducerName+'/'+entity.id)}
        />
    );
};

export default withListResource({
    changePageResources,
    clearMetadataResources,
    defaultSortingOption,
    getPaginatedResources,
    pageSize,
    sortingOptions,
    resourceBaseRoute: reducerName,
    subStateName: reducerName,
})(List);
