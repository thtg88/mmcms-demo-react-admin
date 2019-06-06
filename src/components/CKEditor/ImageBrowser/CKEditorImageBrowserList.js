import React from 'react';
import { withRouter } from 'react-router-dom';
// Create React App seems to throw an error:
// TypeError: Object(...) is not a function
// If the following import is used
// TODO file an issue with CRA team or wait for CRA v3?
// import { ListResource, withListResource } from '../../Resources/ListResource';
import { ListResource } from '../../Resources/ListResource';
import withListResource from '../../Resources/ListResource/withListResource';
import {
    changePageResources,
    clearMetadataResources,
    getPaginatedResources,
} from '../../../redux/images/actions';
import {
    columns,
    defaultSortingOption,
    filters,
    keyField,
    nameField,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    searchTextInputPlaceholder,
    sortingOptions,
} from '../../../redux/images/schema';

const CKEditorImageBrowserList = ({
    fetching_resources,
    page,
    paginated_resources,
    searching,
    ...props,
}) => {
    const searchButtonIconClassName = (searching === true && fetching_resources === true)
        ? 'fa fa-spinner fa-spin'
        : 'fa fa-search';

    return (
        <ListResource
            {...props}
            columns={columns}
            data={paginated_resources[page]}
            hover={!fetching_resources}
            keyField={keyField}
            loading={fetching_resources}
            nameField={nameField}
            page={page}
            pageSize={pageSize}
            searchButtonDisabled={searching || fetching_resources}
            searchButtonIconClassName={searchButtonIconClassName}
            searchEnabled={true}
            searchTextInputPlaceholder={searchTextInputPlaceholder}
            sortingOptions={sortingOptions}
            sortButtonDisabled={fetching_resources}
            type="grid"
        />
    );
};

export default withRouter(withListResource({
    changePageResources,
    clearMetadataResources,
    defaultSortingOption,
    filters,
    getPaginatedResources,
    pageSize,
    reducerName,
    resourceBaseRoute,
    resourceDisplayName,
    sortingOptions,
    isUrlWatcherDisabled: true,
})(CKEditorImageBrowserList));
