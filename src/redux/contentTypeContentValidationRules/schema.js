import { getFullDateText, getTimeText } from '../../helpers/dates';
import {
    reducerName as contentValidationRulesReducerName,
    selectOptionValue as contentValidationRuleSelectOptionValue,
    selectOptionText as contentValidationRuleSelectOptionText,
} from '../contentValidationRules/schema';
import { searchResources as searchContentValidationRules } from '../contentValidationRules/actions';
// Having reducerName in a different files allow the whole schema not to be compiled,
// before redux initializes, causing valuesFetcher to have an undefined fetcher callback.
// Please do not move
import { reducerName } from './variables';

export { reducerName };

export const resourceDisplayName = 'Content Type Validation Rule';

export const resourcesDisplayName = 'Content Type Validation Rules';

export const resourceBaseRoute = 'content-type-content-validation-rules';

export const keyField = 'id';

export const nameField = 'id';

export const selectOptionValue = 'id';

export const selectOptionText = 'id';

export const columns = [
    {
        dataField: 'content_type_content_validation_rules.content_type.name',
        text: 'Type',
        className: 'col-md-12 col-12',
    },
    {
        dataField: 'content_type_content_validation_rules.content_validation_rule.name',
        text: 'Validation Rule',
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
        display_name: 'ID',
        name: 'id',
        direction: 'asc',
    },
    {
        display_name: 'ID',
        name: 'id',
        direction: 'desc',
    },
];

export const defaultSortingOption = {...sortingOptions[0]};

const searchColumns = [];

export const searchTextInputPlaceholder = `Search by ${searchColumns.join(', or ')}`;

export const canDestroy = true;

export const canRestore = true;

export const canUpdate = true;

export const pageSize = 10;

const contentValidationRuleValuesSearcher = {
    reducerName: contentValidationRulesReducerName,
    searcher: searchContentValidationRules,
    searcherName: 'searchContentValidationRules',
};

export const schema = {
    content_type_id: {
        type: 'hidden',
        value: '',
        rules: undefined,
        errors: [],
    },
    content_validation_rule_id: {
        type: 'react-select',
        value: '',
        rules: undefined,
        errors: [],
        label: 'Validation Rule',
        emptyOption: 'Please select a new Validation Rule to associate to this Type...',
        values: [],
        selectOptionText: contentValidationRuleSelectOptionText,
        selectOptionValue: contentValidationRuleSelectOptionValue,
        valuesSearcher: {...contentValidationRuleValuesSearcher},
    },
};

export const attributesSequenceToShow = [
    'content_validation_rule_id',
    'content_type_id',
];
