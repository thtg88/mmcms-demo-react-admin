import * as yup from 'yup';
import moment from 'moment';
import { searchResources } from './actions';
import { getFullDateText, getTimeText, momentSqlDateFormat } from '../../helpers/dates';
import {
    reducerName as productCategoriesReducerName,
    selectOptionText as productCategorySelectOptionText,
    selectOptionValue as productCategorySelectOptionValue,
} from '../productCategories/schema';
import { getAllResources as getAllProductCategories } from '../productCategories/actions';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

export const resourceDisplayName = 'Product';

export const resourcesDisplayName = 'Products';

export const resourceBaseRoute = 'products';

export const resourceTableName = 'products';

export const keyField = 'id';

export const nameField = 'name';

export const selectOptionValue = 'id';

export const selectOptionText = 'name';

const valuesSearcher = {
    reducerName: reducerName,
    searcher: searchResources,
    searcherName: 'searchResources',
};

const productCategoryValuesFetcher = {
    reducerName: productCategoriesReducerName,
    fetcher: getAllProductCategories,
    fetcherName: 'getAllProductCategories',
};

export const columns = [
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-12 col-12',
    },
    {
        dataField: 'price',
        text: 'Price',
        className: 'col-md-4 col-12',
        formatter: price => `£ ${parseFloat(price).toFixed(2)}`,
    },
    {
        dataField: 'stock',
        text: 'Availability',
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'product_categories',
        text: 'Category',
        className: 'col-md-4 col-12',
        formatter: (product_categories) => {
            if(!product_categories || !product_categories.length > 0) {
                return 'N/A';
            }

            const categoryNames = [];

            product_categories.forEach(productCategory => {
                categoryNames.push(productCategory.name);
            });

            return categoryNames.join(', ');
        },
    },
    {
        dataField: 'resource',
        text: 'Date',
        className: 'col-md-12 col-12',
        // TODO format better
        formatter: resource => resource.start_date && resource.end_date
            ? `${getFullDateText(resource.start_date)} - ${getFullDateText(resource.end_date)}`
            : (
                resource.start_date
                    ? getFullDateText(resource.start_date)
                    : (
                        resource.end_date
                            ? getFullDateText(resource.end_date)
                            : 'N/A'
                    )
            ),
    },
    {
        dataField: 'published_at',
        text: 'Published',
        className: 'col-md-12 col-12',
        formatter: (published_at) => published_at === null ? 'N/A' : `${getFullDateText(published_at)} ${getTimeText(published_at)}`,
    },
];

export const filters = [
    {
        disabled: false,
        emptyOption: 'Filter by Category',
        label: 'Category',
        name: 'product_categories',
        operator: 'in',
        selectOptionText: productCategorySelectOptionText,
        selectOptionValue: productCategorySelectOptionValue,
        type: 'select',
        value: '',
        values: [],
        valuesFetcher: {...productCategoryValuesFetcher},
        itemStyle: {textAlign: 'left'},
    },
    {
        disabled: false,
        fieldName: null,
        emptyOption: 'Filter by Past/Future',
        label: 'Past/Future',
        name: 'expiry_date',
        operator: '=',
        type: 'select',
        value: '',
        values: [
            {
                text: 'Past',
                value: moment().format(momentSqlDateFormat),
                data: {
                    name: 'start_date',
                    operator: '<',
                },
            },
            {
                text: 'Future',
                value: moment().format(momentSqlDateFormat),
                data: {
                    name: 'start_date',
                    operator: '>',
                },
            },
        ],
    },
];

export const sortingOptions = [
    {
        display_name: 'Name',
        name: 'name',
        direction: 'asc',
    },
    {
        display_name: 'Name',
        name: 'name',
        direction: 'desc',
    },
    {
        display_name: 'Start Date',
        name: 'start_date',
        direction: 'asc',
    },
    {
        display_name: 'Start Date',
        name: 'start_date',
        direction: 'desc',
    },
];

export const defaultSortingOption = {...sortingOptions[0]};

const searchColumns = [
    'Name',
];

export const searchTextInputPlaceholder = `Search by ${searchColumns.join(', or ')}`;

export const canDestroy = true;

export const canRestore = true;

export const canUpdate = true;

export const pageSize = 10;

export const schema = {
    colour: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
        formText: 'Please provide an HEX with a leading "#"',
    },
    content: {
        type: 'ckeditor',
        value: '',
        rules: undefined,
        errors: [],
        rows: 5,
    },
    earlybird_cutoff_date: {
        type: 'date',
        value: '',
        rules: undefined,
        errors: [],
        label: 'Early bird sale cut-off date',
    },
    end_date: {
        type: 'date',
        value: '',
        rules: undefined,
        errors: [],
    },
    external_link_url: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
        label: 'External Link URL',
        formText: 'This applies to the events in the "Other Events" category',
    },
    is_available_for_upselling: {
        type: 'select',
        emptyOption: 'Please select whether the product is available for upselling at checkout...',
        errors: [],
        label: 'Is Available for Upselling?',
        rules: undefined,
        value: '',
        values: [
            {
                text: 'No',
                value: 0,
            },
            {
                text: 'Yes',
                value: 1,
            },
        ],
    },
    is_club_only: {
        type: 'select',
        emptyOption: 'Please select whether the product is only for clubs...',
        errors: [],
        label: 'Is Club Only?',
        rules: undefined,
        value: '',
        values: [
            {
                text: 'No',
                value: 0,
            },
            {
                text: 'Yes',
                value: 1,
            },
        ],
    },
    is_online: {
        type: 'select',
        emptyOption: 'Please select whether the product can be added to the basket...',
        errors: [],
        label: 'Is Online?',
        rules: undefined,
        value: '',
        values: [
            {
                text: 'No',
                value: 0,
            },
            {
                text: 'Yes',
                value: 1,
            },
        ],
    },
    name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .required()
            .max(255),
        errors: [],
    },
    price: {
        type: 'number',
        value: '',
        rules: undefined,
        errors: [],
    },
    price_was: {
        type: 'number',
        value: '',
        rules: undefined,
        errors: [],
    },
    parent_id: {
        type: 'react-select',
        value: '',
        values: [],
        label: 'Parent Product',
        rules: undefined,
        errors: [],
        emptyOption: 'Please select a Parent Product...',
        selectOptionText: selectOptionText,
        selectOptionValue: selectOptionValue,
        valuesSearcher: {...valuesSearcher},
    },
    product_categories: {
        type: 'react-select',
        value: [],
        label: 'Category',
        rules: undefined,
        errors: [],
        emptyOption: 'Please select the Category...',
        multiple: true,
        multipleSelectLimit: 1,
        values: [
            // values get imported from API...
        ],
        selectOptionText: productCategorySelectOptionText,
        selectOptionValue: productCategorySelectOptionValue,
        valuesFetcher: {...productCategoryValuesFetcher},
    },
    published_at: {
        type: 'hidden',
        value: '',
        rules: undefined,
        errors: [],
    },
    sale_cutoff_date: {
        type: 'date',
        value: '',
        rules: undefined,
        errors: [],
        label: 'Sale cut-off date',
    },
    show_strapline: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    slug: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    start_date: {
        type: 'date',
        value: '',
        rules: undefined,
        errors: [],
    },
    stock: {
        type: 'number',
        value: '',
        rules: undefined,
        errors: [],
    },
    video_url: {
        type: 'url',
        value: '',
        rules: undefined,
        errors: [],
        label: 'Video URL',
    },
};

export const attributesSequenceToShow = [
    'name',
    'slug',
    'price',
    'price_was',
    'show_strapline',
    'stock',
    'start_date',
    'end_date',
    'sale_cutoff_date',
    'earlybird_cutoff_date',
    'video_url',
    'colour',
    'external_link_url',
    'parent_id',
    'product_categories',
    'content',
    'is_available_for_upselling',
    'is_online',
    'is_club_only',
    'nominal_code_id',
    'published_at',
];
