import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

export const resourceDisplayName = 'Role';

export const resourcesDisplayName = 'Roles';

export const resourceBaseRoute = 'roles';

export const keyField = 'id';

export const nameField = 'display_name';

export const selectOptionValue = 'id';

export const selectOptionText = 'display_name';

export const columns = [
    {
        dataField: 'display_name',
        text: 'Display Name',
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'priority',
        text: 'Priority',
        className: 'col-md-12',
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
        display_name: 'Priority',
        name: 'priority',
        direction: 'asc',
    },
    {
        display_name: 'Priority',
        name: 'priority',
        direction: 'desc',
    },
    {
        display_name: 'Display name',
        name: 'display_name',
        direction: 'asc',
    },
    {
        display_name: 'Display name',
        name: 'display_name',
        direction: 'desc',
    },
];

export const defaultSortingOption = {...sortingOptions[0]};

const searchColumns = [
    'Display Name',
];

export const searchTextInputPlaceholder = `Search by ${searchColumns.join(', or ')}`;

export const canDestroy = true;

export const canRestore = true;

export const canUpdate = true;

export const pageSize = 10;

export const schema = {
    display_name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .required()
            .max(255),
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
    priority: {
        type: 'number',
        value: '',
        rules: yup.number()
            .required()
            .integer()
            .min(1),
        errors:[]
    },
};

export const attributesSequenceToShow = [
    'display_name',
    'name',
    'priority',
];
