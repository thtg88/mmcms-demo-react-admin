import React from 'react';
// import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
import {
    reducerName as imageCategoriesReducerName,
    selectOptionText as imageCategorySelectOptionText,
    selectOptionValue as imageCategorySelectOptionValue,
} from '../imageCategories/schema'
import { getAllResources as getAllImageCategories } from '../imageCategories/actions';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

const { REACT_APP_API_BASE_URL } = process.env;

export const resourceDisplayName = 'Image';

export const resourcesDisplayName = 'Images';

export const resourceBaseRoute = 'images';

export const resourceTableName = 'images';

export const keyField = 'id';

export const nameField = 'url';

const imageCategoryValuesFetcher = {
    reducerName: imageCategoriesReducerName,
    fetcher: getAllImageCategories,
    fetcherName: 'getAllImageCategories',
};

export const canDestroy = false;

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
        dataField: 'title',
        text: '',
        className: 'col-md-12 col-12',
    },
    {
        dataField: 'image_category',
        text: '',
        className: 'col-md-12 col-12',
        formatter: (image_category) => image_category
            ? `${image_category.name} (${image_category.target_table})`
            : '',
    },
    {
        dataField: 'resource',
        text: '',
        className: 'col-md-12 col-12',
        formatter: (resource) => {
            if(!resource) {
                return '';
            }

            const imageName = resource.url.replace('/storage/userfiles/images/', '');

            return imageName.slice(imageName.indexOf('-') + 1);
        },
    },
    {
        dataField: 'created_at',
        text: '',
        className: 'col-md-12 col-12',
        formatter: (created_at) => `${getFullDateText(created_at)} ${getTimeText(created_at)}`,
    },
];

export const filters = [
    {
        disabled: false,
        emptyOption: 'Filter by Category',
        label: 'Category',
        name: 'image_category_id',
        operator: '=',
        selectOptionText: imageCategorySelectOptionText,
        selectOptionValue: imageCategorySelectOptionValue,
        type: 'select',
        value: '',
        values: [],
        valuesFetcher: {...imageCategoryValuesFetcher},
    },
];

export const sortingOptions = [
    {
        display_name: 'Date Created',
        name: 'created_at',
        direction: 'desc',
    },
    {
        display_name: 'Date Created',
        name: 'created_at',
        direction: 'asc',
    },
    {
        display_name: 'Title',
        name: 'title',
        direction: 'asc',
    },
    {
        display_name: 'Title',
        name: 'title',
        direction: 'desc',
    },
];

export const defaultSortingOption = {...sortingOptions[0]};

const searchColumns = [
    'Title',
    'Filename',
];

export const searchTextInputPlaceholder = `Search by ${searchColumns.join(', or ')}`;

export const pageSize = 9;

export const schema = {
    caption: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    name: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    title: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    url: {
        type: 'img',
        value: '',
        rules: undefined,
        errors: [],
    },
};

export const attributesSequenceToShow = [
    'url',
    // 'name',
    'title',
    'caption',
];
