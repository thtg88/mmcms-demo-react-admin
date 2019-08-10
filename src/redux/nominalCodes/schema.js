import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
import {
    reducerName as companiesReducerName,
    selectOptionText as companySelectOptionText,
    selectOptionValue as companySelectOptionValue,
} from '../companies/schema';
import { getAllResources as getAllCompanies } from '../companies/actions';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

export const resourceDisplayName = 'Nominal Code';

export const resourcesDisplayName = 'Nominal Codes';

export const resourceBaseRoute = 'nominal-codes';

export const keyField = 'id';

export const nameField = 'name';

export const selectOptionValue = 'id';

export const selectOptionText = (nominal_code) => `${nominal_code.code} - ${nominal_code.name} (${nominal_code.company.name})`;

export const companyValuesFetcher = {
    reducerName: companiesReducerName,
    fetcher: getAllCompanies,
    fetcherName: 'getAllCompanies',
};

export const columns = [
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-12 col-12',
    },
    {
        dataField: 'code',
        text: 'Code',
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'company.name',
        text: 'Company',
        className: 'col-md-8 col-12',
    },
    {
        dataField: 'created_at',
        text: 'Created',
        className: 'col-md-12 col-12',
        formatter: (created_at) => `${getFullDateText(created_at)} ${getTimeText(created_at)}`,
    },
];

export const filters = [
    {
        disabled: false,
        emptyOption: 'Filter by Company',
        label: 'Company',
        name: 'company_id',
        operator: '=',
        selectOptionText: companySelectOptionText,
        selectOptionValue: companySelectOptionValue,
        type: 'select',
        value: '',
        values: [],
        valuesFetcher: {...companyValuesFetcher},
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
        display_name: 'Code',
        name: 'code',
        direction: 'asc',
    },
    {
        display_name: 'Code',
        name: 'code',
        direction: 'desc',
    },
];

export const defaultSortingOption = {...sortingOptions[0]};

const searchColumns = [
    'Name',
    'Code',
];

export const searchTextInputPlaceholder = `Search by ${searchColumns.join(', or ')}`;

export const canDestroy = true;

export const pageSize = 10;

export const schema = {
    name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .required()
            .max(255),
        errors: [],
    },
    code: {
        type: 'text',
        value: '',
        rules: yup.string()
            .required()
            .max(255),
        errors: [],
    },
    company_id: {
        type: 'select',
        value: '',
        rules: undefined,
        errors:[],
        values: [],
        emptyOption: 'Please select a company...',
        selectOptionText: companySelectOptionText,
        selectOptionValue: companySelectOptionValue,
        valuesFetcher: {...companyValuesFetcher},
    },
};

export const attributesSequenceToShow = [
    'name',
    'code',
    'company_id',
];


