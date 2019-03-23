// import * as yup from 'yup';
import { getFullDateText, getTimeText } from '../../helpers/dates';

export const resourceDisplayName = 'SEO Entry';

export const resourcesDisplayName = 'SEO Entries';

export const resourceTableName = 'seo_entries';

export const keyField = 'id';

export const nameField = 'page_title';

export const columns = [
    {
        dataField: 'page_title',
        text: 'Page Title',
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
        display_name: 'Page Title',
        name: 'page_title',
        direction: 'asc',
    },
    {
        display_name: 'Page Title',
        name: 'page_title',
        direction: 'desc',
    },
];

export const defaultSortingOption = {...sortingOptions[0]};

export const searchColumns = [
    'page_title',
];

export const pageSize = 10;

export const schema = {
    facebook_description: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    facebook_image: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    facebook_title: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    meta_description: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    meta_robots_follow: {
        type: 'select',
        value: '',
        label: 'Meta robots follow',
        emptyOption: 'Please select a robots follow option...',
        values: [
            {
                text: 'follow',
                value: 'follow',
            },
            {
                text: 'nofollow',
                value: 'nofollow',
            },
        ],
        rules: undefined,
        errors: [],
    },
    meta_robots_index: {
        type: 'select',
        label: 'Meta robots index',
        value: '',
        emptyOption: 'Please select a robots index option...',
        values: [
            {
                text: 'index',
                value: 'index',
            },
            {
                text: 'noindex',
                value: 'noindex',
            },
        ],
        rules: undefined,
        errors: [],
    },
    meta_title: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    page_title: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    twitter_description: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    twitter_image: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    twitter_title: {
        type: 'text',
        value: '',
        rules: undefined,
        errors: [],
    },
    json_schema: {
        type: 'textarea',
        label: 'JSON schema',
        value: '',
        rows: 5,
        rules: undefined,
        errors: [],
    },
};

export const attributesSequenceToShow = [
    'page_title',
    'meta_title',
    'meta_description',
    'meta_robots_follow',
    'meta_robots_index',
    'json_schema',
    'facebook_description',
	'facebook_image',
	'facebook_title',
	'twitter_description',
	'twitter_image',
	'twitter_title',
];

export default schema;
