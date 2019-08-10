import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
import {
    reducerName as nominalCodesReducerName,
    selectOptionValue as nominalCodeSelectOptionValue,
    selectOptionText as nominalCodeSelectOptionText,
} from '../nominalCodes/schema';
import { getAllResources as getAllNominalCodes } from '../nominalCodes/actions';
import {
    reducerName as taxRatesReducerName,
    selectOptionText as taxRateSelectOptionText,
    selectOptionValue as taxRateSelectOptionValue,
} from '../taxRates/schema';
import { getAllResources as getAllTaxRates } from '../taxRates/actions';
import {
    reducerName as voucherTypesReducerName,
    selectOptionText as voucherTypeSelectOptionText,
    selectOptionValue as voucherTypeSelectOptionValue,
} from '../voucherTypes/schema';
import { getAllResources as getAllVoucherTypes } from '../voucherTypes/actions';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

const nominalCodeValuesFetcher = {
    reducerName: nominalCodesReducerName,
    fetcher: getAllNominalCodes,
    fetcherName: 'getAllNominalCodes',
};

const taxRateValuesFetcher = {
    reducerName: taxRatesReducerName,
    fetcher: getAllTaxRates,
    fetcherName: 'getAllTaxRates',
};

const voucherTypeValuesFetcher = {
    reducerName: voucherTypesReducerName,
    fetcher: getAllVoucherTypes,
    fetcherName: 'getAllVoucherTypes',
};

export const resourceDisplayName = 'Voucher Denomination';

export const resourcesDisplayName = 'Voucher Denominations';

export const resourceBaseRoute = 'voucher-denominations';

export const resourceTableName = 'voucher_denominations';

export const keyField = 'id';

export const nameField = 'name';

export const selectOptionValue = 'id';

export const selectOptionText = 'name';

export const columns = [
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-12 col-12',
    },
    {
        dataField: 'nominal_code',
        text: 'Nominal Code',
        className: 'col-md-12 col-12',
        formatter: nominal_code => nominal_code
            ? (
                `${nominal_code.code} - ${nominal_code.name} ${nominal_code.company ? '('+nominal_code.company.name+')' : ''}`
            )
            : 'N/A',
    },
    {
        dataField: 'amount',
        text: 'Amount',
        className: 'col-md-6 col-12',
        formatter: amount => `£ ${parseFloat(amount).toFixed(2)}`,
    },
    {
        dataField: 'voucher_type.name',
        text: 'Type',
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'published_at',
        text: 'Published',
        className: 'col-md-6 col-12',
        formatter: (published_at) => published_at === null ? 'N/A' : `${getFullDateText(published_at)} ${getTimeText(published_at)}`,
    },
    {
        dataField: 'created_at',
        text: 'Created',
        className: 'col-md-6 col-12',
        formatter: (created_at) => `${getFullDateText(created_at)} ${getTimeText(created_at)}`,
    },
];

export const filters = [
    {
        disabled: false,
        emptyOption: 'Filter by Nominal Code',
        label: 'Nominal Code',
        name: 'nominal_code_id',
        operator: '=',
        selectOptionText: nominalCodeSelectOptionText,
        selectOptionValue: nominalCodeSelectOptionValue,
        type: 'select',
        value: '',
        values: [],
        valuesFetcher: {...nominalCodeValuesFetcher},
    },
    {
        disabled: false,
        emptyOption: 'Filter by Type',
        label: 'Type',
        name: 'voucher_type_id',
        operator: '=',
        selectOptionText: voucherTypeSelectOptionText,
        selectOptionValue: voucherTypeSelectOptionValue,
        type: 'select',
        value: '',
        values: [],
        valuesFetcher: {...voucherTypeValuesFetcher},
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
    amount: {
        type: 'number',
        value: '',
        rules: undefined,
        errors: [],
    },
    content: {
        type: 'ckeditor',
        value: '',
        rules: undefined,
        errors: [],
        rows: 5,
    },
    name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .required()
            .max(255),
        errors: [],
    },
    nominal_code_id: {
        type: 'select',
        value: '',
        label: 'Nominal Code',
        values: [],
        rules: undefined,
        errors: [],
        emptyOption: 'Please select a Nominal Code...',
        selectOptionText: nominalCodeSelectOptionText,
        selectOptionValue: nominalCodeSelectOptionValue,
        valuesFetcher: {...nominalCodeValuesFetcher},
    },
    published_at: {
        type: 'hidden',
        value: '',
        rules: undefined,
        errors: [],
    },
    tax_rate_id: {
        type: 'select',
        value: '',
        label: 'Tax Rate',
        rules: undefined,
        errors: [],
        emptyOption: 'Please select the Tax Rate...',
        values: [
            // values get imported from API...
        ],
        selectOptionText: taxRateSelectOptionText,
        selectOptionValue: taxRateSelectOptionValue,
        valuesFetcher: {...taxRateValuesFetcher},
    },
    voucher_type_id: {
        type: 'select',
        value: '',
        label: 'Type',
        rules: undefined,
        errors: [],
        emptyOption: 'Please select the Voucher Type...',
        values: [
            // values get imported from API...
        ],
        selectOptionText: voucherTypeSelectOptionText,
        selectOptionValue: voucherTypeSelectOptionValue,
        valuesFetcher: {...voucherTypeValuesFetcher},
    },
};

export const attributesSequenceToShow = [
    'name',
    'amount',
    'nominal_code_id',
    'voucher_type_id',
    'tax_rate_id',
    'content',
    'published_at',
];
