import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';
import {
    resourceBaseRoute as contentModelsResourceBaseRoute,
} from '../contentModels/schema';
import {
    reducerName as contentTypesReducerName,
    selectOptionText as contentTypeSelectOptionText,
    selectOptionValue as contentTypeSelectOptionValue,
} from '../contentTypes/schema';
import {
    getAllResources as getAllContentTypes
} from '../contentTypes/actions';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

export const resourceDisplayName = 'Content Field';

export const resourcesDisplayName = 'Content Fields';

export const resourceBaseRoute = 'content-fields';

export const redirectUrlAfterCreate = `/${contentModelsResourceBaseRoute}/:content_model_id/${resourceBaseRoute}/:id`;

export const keyField = 'id';

export const nameField = 'display_name';

export const contentTypeValuesFetcher = {
    reducerName: contentTypesReducerName,
    fetcher: getAllContentTypes,
    fetcherName: 'getAllContentTypes',
};

export const columns = [
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-5 col-12',
    },
    {
        dataField: 'content_type.name',
        text: 'Type',
        className: 'col-md-4 col-12',
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
        emptyOption: 'Filter by Type',
        label: 'Type',
        name: 'content_type_id',
        operator: '=',
        selectOptionText: contentTypeSelectOptionText,
        selectOptionValue: contentTypeSelectOptionValue,
        type: 'select',
        value: '',
        values: [],
        valuesFetcher: {...contentTypeValuesFetcher},
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

export const canRestore = false;

export const canUpdate = false;

export const pageSize = 10;

export const schema = {
    content_model_id: {
        type: 'hidden',
        value: '',
        rules: undefined,
        errors: [],
    },
    content_type_id: {
        type: 'select',
        value: '',
        rules: yup.number()
            .min(1),
        errors: [],
        label: 'Type',
        emptyOption: 'Please select a type...',
        values: [],
        selectOptionText: contentTypeSelectOptionText,
        selectOptionValue: contentTypeSelectOptionValue,
        valuesFetcher: {...contentTypeValuesFetcher},
    },
    display_name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .max(255),
        errors: [],
    },
    helper_text: {
        type: 'textarea',
        value: '',
        rules: undefined,
        errors: [],
        rows: 8,
    },
    is_mandatory: {
        type: 'select',
        value: '',
        rules: undefined,
        errors: [],
        label: 'Is Mandatory?',
        emptyOption: 'Please select a value...',
        values: [
            {
                text: 'No',
                value: false,
            },
            {
                text: 'Yes',
                value: true,
            },
        ],
    },
    is_resource_name: {
        type: 'select',
        value: '',
        rules: undefined,
        errors: [],
        label: 'Is Resource Name?',
        emptyOption: 'Please select a value...',
        values: [
            {
                text: 'No',
                value: false,
            },
            {
                text: 'Yes',
                value: true,
            },
        ],
    },
    name: {
        type: 'text',
        value: '',
        rules: yup.string()
            .max(255),
        errors: [],
    },
};

export const attributesSequenceToShow = [
    'content_model_id',
    'display_name',
    'name',
    'content_type_id',
    'helper_text',
    'is_mandatory',
    'is_resource_name',
];
