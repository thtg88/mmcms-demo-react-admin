import getSchemaValueFromKeyAndParameter from './getSchemaValueFromKeyAndParameter';
import getSelectOptionValues from './getSelectOptionValues';
import getTypeFromKey from './getTypeFromKey';

const getFormResourceFromValues = (
    values,
    schema,
    attributesSequenceToShow = []
) => {
    if(typeof values === 'undefined' || values === null) {
        return schema;
    }

    const resource = Object.entries(values).reduce(
        (result, [key, value]) => {
            // If I'm not showing the attribute,
            // Skip the item (just progress with the result object)
            if(attributesSequenceToShow.indexOf(key) === -1) {
                return {
                    ...result
                };
            }

            // Disabled attribute
            let disabled = false;
            if(
                schema &&
                schema[key] &&
                typeof schema[key].disabled !== 'undefined'
            ) {
                disabled = schema[key].disabled;
            } else if(key.length > 3 && key.indexOf('_at') === key.length - 3) {
                // We disable everything ending in "_at"
                // to avoid people to fiddle around with timestamps
                disabled = true;
            }

            // Type
            const type = getTypeFromKey(schema, key);

            // Label text
            const label = getSchemaValueFromKeyAndParameter(schema, key, 'label');

            // Empty option text (for select inputs)
            const emptyOption = getSchemaValueFromKeyAndParameter(schema, key, 'emptyOption');

            // multiple prop for selects
            const multiple = getSchemaValueFromKeyAndParameter(schema, key, 'multiple');

            // selectOptionText prop to decide how the text of a select/react-select option is going to look like
            const selectOptionText = getSchemaValueFromKeyAndParameter(schema, key, 'selectOptionText');

            // selectOptionValue prop to decide how the value of a select/react-select option is going to look like
            const selectOptionValue = getSchemaValueFromKeyAndParameter(schema, key, 'selectOptionValue');

            const valuesFetcher = getSchemaValueFromKeyAndParameter(schema, key, 'valuesFetcher');

            // Values array of values and texts (for select inputs)
            const values = getSchemaValueFromKeyAndParameter(schema, key, 'values');

            // Form Feedback to show additional message below form input
            const formText = getSchemaValueFromKeyAndParameter(schema, key, 'formText');

            // Date Format for display of react-datetime dependency
            const dateFormat = getSchemaValueFromKeyAndParameter(schema, key, 'dateFormat');

            // Time Format for display of react-datetime dependency
            const timeFormat = getSchemaValueFromKeyAndParameter(schema, key, 'timeFormat');

            // Is Valid Date function for hiding certain dates of react-datetime dependenencies
            const isValidDate = getSchemaValueFromKeyAndParameter(schema, key, 'isValidDate');

            // rows prop for textareas
            const rows = getSchemaValueFromKeyAndParameter(schema, key, 'rows');

            // multipleSelectLimit prop for react-select
            const multipleSelectLimit = getSchemaValueFromKeyAndParameter(schema, key, 'multipleSelectLimit');

            let newValue;
            if(
                (
                    type === 'select'
                    || type === 'react-select'
                )
                && multiple === true
                && value
                && value.length
                && typeof selectOptionText !== 'undefined'
                && typeof selectOptionValue !== 'undefined'
            ) {
                // If it's a multiple select (or react-select)
                // And the value is an array,
                // And there are a selectOptionText and selectOptionValue
                // We transform the value array in an array of object containing
                // the values in the format needed by the select
                newValue = getSelectOptionValues(values, value, selectOptionText, selectOptionValue);
            }

            let data = {
                type: type,
                value: newValue ? newValue : value,
                errors: [],
                rules: getSchemaValueFromKeyAndParameter(schema, key, 'rules'),
                disabled: disabled,
            };
            if(typeof label !== 'undefined') {
                data.label = label;
            }
            if(typeof emptyOption !== 'undefined') {
                data.emptyOption = emptyOption;
            }
            if(typeof values !== 'undefined') {
                data.values = values;
            }
            if(typeof formText !== 'undefined') {
                data.formText = formText;
            }
            if(typeof dateFormat !== 'undefined') {
                data.dateFormat = dateFormat;
            }
            if(typeof timeFormat !== 'undefined') {
                data.timeFormat = timeFormat;
            }
            if(typeof isValidDate !== 'undefined') {
                data.isValidDate = isValidDate;
            }
            if(typeof rows !== 'undefined') {
                data.rows = rows;
            }
            if(typeof multiple !== 'undefined') {
                data.multiple = multiple;
            }
            if(typeof multipleSelectLimit !== 'undefined') {
                data.multipleSelectLimit = multipleSelectLimit;
            }
            if (typeof selectOptionText !== 'undefined') {
                data.selectOptionText = selectOptionText;
            }
            if (typeof selectOptionValue !== 'undefined') {
                data.selectOptionValue = selectOptionValue;
            }
            if (typeof valuesFetcher !== 'undefined') {
                data.valuesFetcher = valuesFetcher;
            }

            return {
                ...result,
                [key]: {...data},
            };
        },
        {}
    );

    return resource;
};

export default getFormResourceFromValues;
