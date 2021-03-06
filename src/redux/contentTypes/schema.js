import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

export const resourceDisplayName = 'Content Type';

export const resourcesDisplayName = 'Content Types';

export const resourceBaseRoute = 'content-types';

export const keyField = 'id';

export const nameField = 'name';

export const selectOptionText = 'name';

export const selectOptionValue = 'id';

export const columns = [
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-5 col-12',
    },
    {
        dataField: 'migration_method',
        text: 'Migration Method',
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'priority',
        text: 'Priority',
        className: 'col-md-8 col-12',
    },
    {
        dataField: 'created_at',
        text: 'Created',
        className: 'col-md-12',
        formatter: (created_at) => `${getFullDateText(created_at)} ${getTimeText(created_at)}`,
    }
];

export const filters = [];

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
        display_name: 'Priority',
        name: 'priority',
        direction: 'asc',
    },
    {
        display_name: 'Priority',
        name: 'priority',
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
    description: {
        type: 'textarea',
        value: '',
        rules: undefined,
        errors: [],
        rows: 8,
    },
    migration_method: {
        type: 'text',
        value: '',
        rules: yup.string()
            .max(255),
        errors: [],
        label: 'Migration Method',
    },
    name: {
        type: 'text',
        value: '',
        rules: yup.string()
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
    'name',
    'migration_method',
    'priority',
    'description',
];
