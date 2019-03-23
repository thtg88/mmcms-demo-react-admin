import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';

export const resourceDisplayName = 'Image';

export const resourcesDisplayName = 'Images';

export const resourceTableName = 'images';

export const keyField = 'id';

export const nameField = 'name';

export const columns = [
    {
        dataField: 'name',
        text: 'Name',
        className: 'col-md-12 col-12',
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

export const searchColumns = [
    'Name',
];

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
};

export default schema;
