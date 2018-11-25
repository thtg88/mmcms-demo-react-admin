import React from 'react';
import IndexResource from '../IndexResource';
import withListResource from '../withListResource';
import reducerRegistry from '../../../redux/reducerRegistry';
import {
    changePageResources,
    clearMetadataResources,
    getPaginatedResources,
    reducerName,
} from '../../../redux/roles/actions';
import roles from '../../../redux/roles/reducers';
import { columns, pageSize } from './tableConfig';

reducerRegistry.register(reducerName, roles);

const resourcesName = 'Roles';

const actions = [
    {
        className: 'btn-success',
        href: '/'+reducerName+'/create',
        title: 'New Resource',
        type: 'link',
        iconClassName: 'fa fa-plus',
    }
];

export const List = ({
    current_page,
    errors,
    fetching_resources,
    history,
    onSearchButtonClick,
    onSearchInputChange,
    query,
    resources,
    searching,
    total,
}) => {
    // console.log(props);

    return (
        <IndexResource
            actions={actions}
            columns={columns}
            currentPage={current_page}
            errors={errors}
            fetchingResources={fetching_resources}
            history={history}
            listType="list"
            onSearchButtonClick={onSearchButtonClick}
            onSearchInputChange={onSearchInputChange}
            pageSize={pageSize}
            resources={resources}
            resourcesName={resourcesName}
            searching={searching}
            searchQuery={query}
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
        getPaginatedResources,
        pageSize,
        resourceBaseRoute: reducerName,
        subStateName: reducerName,
    }
);
