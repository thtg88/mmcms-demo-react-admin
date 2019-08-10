import React from 'react';
// import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
import { resourceBaseRoute as imagesResourceBaseRoute } from '../images/schema';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

const { REACT_APP_API_BASE_URL } = process.env;

export { reducerName };

export const resourceDisplayName = 'Image Thumbnail';

export const resourcesDisplayName = 'Image Thumbnails';

export const resourceBaseRoute = 'thumbnails';

export const redirectUrlAfterCreate = `/${imagesResourceBaseRoute}/:image_id/${resourceBaseRoute}/:id`;

// export const resourceTableName = 'image_sizes';

export const keyField = 'id';

export const nameField = 'url';

export const selectOptionValue = 'id';

export const selectOptionText = (resource) => {
    return resource.image_size.width && resource.image_size.height
        ? `${resource.image_size.width}x${resource.image_size.height}`
        : (
            resource.image_size.width
                ? `${resource.image_size.width}w`
                : `${resource.image_size.height}h`
        )
};

export const columns = [
    {
        dataField: 'resource',
        text: '',
        className: 'col-md-12 col-12',
        style: {height: '100px'},
        formatter: (resource) => resource && resource.url
            ? (
                <div className="d-flex align-items-center">
                    <img
                        src={`${REACT_APP_API_BASE_URL}${resource.url}`}
                        alt={resource.title}
                        style={{maxHeight: '100px', maxWidth: '100%'}}
                        className="mx-auto d-block"
                    />
                </div>
            )
            : null,
    },
    {
        dataField: 'image_size',
        text: 'Size',
        className: 'col-md-12 col-12',
        formatter: (image_size) => {
            return image_size.width && image_size.height
                ? `${image_size.width}x${image_size.height}`
                : (
                    image_size.width
                        ? `${image_size.width}w`
                        : `${image_size.height}h`
                )
        },
    },
    {
        dataField: 'created_at',
        text: 'Created',
        className: 'col-md-12 col-12',
        formatter: (created_at) => `${getFullDateText(created_at)} ${getTimeText(created_at)}`,
    },
];

export const sortingOptions = [
    {
        display_name: 'ID',
        name: 'id',
        direction: 'asc',
    },
    {
        display_name: 'ID',
        name: 'id',
        direction: 'desc',
    },
];

export const defaultSortingOption = {...sortingOptions[0]};

const searchColumns = [
    //
];

export const searchTextInputPlaceholder = `Search by ${searchColumns.join(', or ')}`;

export const canDestroy = true;

export const pageSize = 9;

export const schema = {
    url: {
        type: 'img',
        value: '',
        rules: undefined,
        errors: [],
        disabled: true,
        dontEnable: true,
    },
    image_id: {
        type: 'hidden',
        value: '',
        rules: undefined,
        errors: [],
        disabled: true,
        dontEnable: true,
    },
};

export const attributesSequenceToShow = [
    'url',
    'image_id',
];
