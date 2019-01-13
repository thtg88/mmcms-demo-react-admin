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
} from '../../../redux/roles/actions';
import reducer from '../../../redux/roles/reducers';
import sagas from '../../../redux/roles/sagas';
import { columns, pageSize } from './tableConfig';

reducerRegistry.register(reducerName, reducer);
sagaRegistry.register(reducerName, sagas);

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
