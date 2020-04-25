import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

export const resourceDisplayName = 'Model';

export const resourcesDisplayName = 'Models';

export const resourceBaseRoute = 'content-models';

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
        dataField: 'model_name',
        text: 'Model Name',
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'table_name',
        text: 'Table Name',
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'base_route_name',
        text: 'Display Name',
        className: 'col-md-4 col-12',
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
    base_route_name: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    description: {
        type: 'textarea',
        value: '',
        rules: undefined,
        errors: [],
        rows: 8,
    },
    model_name: {
        type: 'text',
        value: '',
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
    table_name: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
};

export const attributesSequenceToShow = [
    'name',
    'model_name',
    'table_name',
    'base_route_name',
    'description',
];
