import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
import { getAllResources as getAllProductCategories } from './actions';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

export const resourceDisplayName = 'Product Category';

export const resourcesDisplayName = 'Product Categories';

export const resourceBaseRoute = 'product-categories';

export const resourceTableName = 'product_categories';

export const keyField = 'id';

export const nameField = 'name';

export const selectOptionValue = 'id';

export const selectOptionText = 'name';

export const columns = [
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'published_at',
        text: 'Published',
        className: 'col-md-12 col-12',
        formatter: (published_at) => published_at === null ? 'N/A' : `${getFullDateText(published_at)} ${getTimeText(published_at)}`,
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
        display_name: 'Name',
        name: 'name',
        direction: 'asc',
    },
    {
        display_name: 'Name',
        name: 'name',
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

const valuesFetcher = {
    reducerName: reducerName,
    fetcher: getAllProductCategories,
    fetcherName: 'getAllProductCategories',
};

export const schema = {
    content: {
        type: 'ckeditor',
        value: '',
        rules: undefined,
        errors: [],
    },
    colour: {
        // TODO replace with colour picker
        type: 'text',
        value: undefined,
        rules: yup.string()
            .notRequired()
            .max(50),
        errors: [],
    },
    drive_time: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    faq: {
        type: 'ckeditor',
        value: '',
        label: 'FAQ',
        rules: undefined,
        errors: [],
    },
    name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .required()
            .max(255),
        errors: [],
    },
    parent_id: {
        type: 'select',
        label: 'Parent Category',
        value: '',
        values: [],
        rules: undefined,
        errors: [],
        emptyOption: 'Please select a Parent Category...',
        selectOptionText: selectOptionText,
        selectOptionValue: selectOptionValue,
        valuesFetcher: {...valuesFetcher},
    },
    price: {
        type: 'number',
        value: '',
        rules: undefined,
        errors: [],
    },
    published_at: {
        type: 'hidden',
        value: '',
        rules: undefined,
        errors: [],
    },
    reviews: {
        type: 'ckeditor',
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
    video_url: {
        type: 'url',
        value: '',
        rules: undefined,
        errors: [],
    },
};

export const attributesSequenceToShow = [
    'name',
    'slug',
    'parent_id',
    'price',
    'drive_time',
    'video_url',
    'content',
    'faq',
    'reviews',
    'published_at',
];
