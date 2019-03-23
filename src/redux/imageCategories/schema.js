import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';

export const resourceDisplayName = 'Image Category';

export const resourcesDisplayName = 'Image Categories';

export const resourceBaseRoute = 'image-categories';

export const keyField = 'id';

export const nameField = 'name';

export const columns = [
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-12',
    },
    {
        dataField: 'sequence',
        text: 'Sequence',
        className: 'col-md-4 col-12',
    },
    {
        dataField: 'target_table',
        text: 'Target Table',
        className: 'col-md-8 col-12',
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
        display_name: 'Target Table',
        name: 'target_table',
        direction: 'asc',
    },
    {
        display_name: 'Target Table',
        name: 'target_table',
        direction: 'desc',
    },
    {
        display_name: 'Sequence',
        name: 'sequence',
        direction: 'asc',
    },
    {
        display_name: 'Sequence',
        name: 'sequence',
        direction: 'desc',
    },
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

export const searchColumns = [
    'Name',
    'Target Table',
];

export const canDestroy = true;

export const pageSize = 10;

export const schema = {
    sequence: {
        type: 'number',
        value: '',
        rules: yup.number()
            .required()
            .integer()
            .min(1),
        errors:[]
    },
    target_table: {
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
};

export const attributesSequenceToShow = [
    'sequence',
    'name',
    'target_table',
];

export default schema;
