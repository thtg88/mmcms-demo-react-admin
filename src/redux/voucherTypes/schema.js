import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

export const resourceDisplayName = 'Voucher Type';

export const resourcesDisplayName = 'Voucher Types';

export const resourceBaseRoute = 'voucher-types';

export const keyField = 'id';

export const nameField = 'short_name';

export const selectOptionValue = 'id';

export const selectOptionText = 'short_name';

export const columns = [
    {
        dataField: 'short_name',
        text: 'Short Name',
        className: 'col-md-12 col-12',
    },
    {
        dataField: 'is_featured',
        text: 'Featured',
        className: 'col-md-12 col-12',
        formatter: (is_featured) => is_featured ? 'Yes' : 'No',
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

export const pageSize = 10;

export const schema = {
    icon_class_name: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    is_featured: {
        type: 'select',
        value: '',
        rules: undefined,
        label: 'Is Featured?',
        errors: [],
        emptyOption: 'Please select whether the Voucher Type is Featured or not...',
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
        formText: 'This is the text displaying in the gifts page.',
    },
    short_name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .required()
            .max(255),
        errors: [],
        formText: 'This is the text displaying everywhere else across the site when referring to this type.',
    },
    slug: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
};

export const attributesSequenceToShow = [
    'name',
    'short_name',
    'slug',
    'icon_class_name',
    'is_featured',
];
