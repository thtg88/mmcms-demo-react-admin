import get from './get';

const getSelectOptionValues = (options, values, textField, valueField) => {
    const optionValues = options.map(option => option.value);

    const newValues = values.map(resource => {
        // If value is a function,
        // We execute it passing the resource so it can compute the value
        let value;
        if(typeof valueField === 'function') {
            value = valueField(resource);
        } else {
            value = get(resource, valueField);
        }

        return value;
    }).filter(value => optionValues.indexOf(value) > -1);

    return newValues;
};

export default getSelectOptionValues;
