import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
import {
    reducerName as contentMigrationMethodsReducerName,
    selectOptionText as contentMigrationMethodSelectOptionText,
    selectOptionValue as contentMigrationMethodSelectOptionValue,
} from '../contentMigrationMethods/schema';
import {
    getAllResources as getAllContentMigrationMethods
} from '../contentMigrationMethods/actions';
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

export const contentMigrationMethodValuesFetcher = {
    reducerName: contentMigrationMethodsReducerName,
    fetcher: getAllContentMigrationMethods,
    fetcherName: 'getAllContentMigrationMethods',
};

export const columns = [
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-5 col-12',
    },
    {
        dataField: 'content_migration_method.name',
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

export const filters = [
    {
        disabled: false,
        emptyOption: 'Filter by Migration Method',
        label: 'Migration Method',
        name: 'content_migration_method_id',
        operator: '=',
        selectOptionText: contentMigrationMethodSelectOptionText,
        selectOptionValue: contentMigrationMethodSelectOptionValue,
        type: 'select',
        value: '',
        values: [],
        valuesFetcher: {...contentMigrationMethodValuesFetcher},
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

export const canUpdate = true;

export const pageSize = 10;

export const schema = {
    content_migration_method_id: {
        type: 'select',
        value: '',
        rules: yup.number()
            .min(1),
        errors: [],
        label: 'Migration Method',
        emptyOption: 'Please select a migration method...',
        values: [],
        selectOptionText: contentMigrationMethodSelectOptionText,
        selectOptionValue: contentMigrationMethodSelectOptionValue,
        valuesFetcher: {...contentMigrationMethodValuesFetcher},
    },
    description: {
        type: 'textarea',
        value: '',
        rules: undefined,
        errors: [],
        rows: 8,
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
    'content_migration_method_id',
    'priority',
    'description',
];
