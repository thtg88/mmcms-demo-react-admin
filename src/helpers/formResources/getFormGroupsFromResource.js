const getFormGroupsFromResource = (
    resource,
    onInputChange,
    isRecovering,
    onCKEditorImageUpload
) => {
    if(!resource) {
        return [];
    }

    return Object.entries(resource).filter(([name, params], idx) => {
        if(
            // We skip everything that's not undefined
            typeof resource[name] === 'undefined'
            // we skip id
            || name === 'id'
        ) {
            return false;
        }

        if(typeof params.value === 'object' && params.value !== null && typeof params.value.length === 'undefined') {
            // We skip objects as we do not have any way of rendering them
            // But we do not skip arrays as we might need them for multiple selects
            // hence the typeof params.value.length === 'undefined'
            return false;
        }

        return true;

    }).map(([name, params], idx) => {
        const disabled = isRecovering === true
            ? true
            : (
                params.disabled
                    ? params.disabled
                    : false
            );
        const label = params.label
            ? params.label
            : name.charAt(0).toUpperCase()+name.substr(1).replace('_', ' ');
        const placeholder = params.placeholder
            ? params.placeholder
            : `Enter the ${label}`;
        const type = params.type
            ? params.type
            : "text";
        const value = params.value === null
            ? ''
            : params.value;
        const errors = params.errors
            ? params.errors
            : [];
        const emptyOption = params.emptyOption
            ? params.emptyOption
            : '';
        const values = params.values
            ? params.values
            : [];
        const formText = params.formText
            ? params.formText
            : null;
        const multiple = params.multiple
            ? params.multiple
            : false;
        const dateFormat = params.dateFormat
            ? params.dateFormat
            : undefined;
        const timeFormat = params.timeFormat
            ? params.timeFormat
            : false;
        const isValidDate = params.isValidDate
            ? params.isValidDate
            : undefined;
        const closeOnSelect = params.closeOnSelect
            ? params.closeOnSelect
            : undefined;
        const rows = params.rows
            ? params.rows
            : undefined;
        const multipleSelectLimit = params.multipleSelectLimit
            ? params.multipleSelectLimit
            : undefined;

        if(type === 'react-select') {
            // React select wants the full option as a value [sic.]
            const reactSelectValues = multiple === true
                // We extract all the options
                ? values.filter(option => {
                    // value is an array for multiple selects
                    // So we need to check if the option.value is contained in that value(s)
                    return value.indexOf(option.value) > -1;
                })
                // We extract the single option from the multiple select
                : values.filter(option => {
                    return option.value === value;
                });

            const reactSelectValue = multiple === true
                ? reactSelectValues.map(option => ({ ...option, label: option.text }))
                : (
                    reactSelectValues.length > 0
                        ? {
                            ...reactSelectValues[0],
                            label: reactSelectValues[0].text,
                        }
                        : null
                );

            return {
                disabled: disabled,
                formFeedback: errors.length ? errors.join('. ') : null,
                key: name,
                invalid: errors.length > 0,
                label: label,
                multiple: multiple,
                multipleSelectLimit: multipleSelectLimit,
                name: name,
                onChange: (selectedOption, extra) => onInputChange(selectedOption, {...extra, name, multiple}),
                placeholder: placeholder,
                type: type,
                value: reactSelectValue,
                values: values.map(option => ({ ...option, label: option.text })),
            };
        }

        if(type === 'checkbox') {
            return {
                checked: value === 1,
                className: 'pb-3',
                disabled: disabled,
                formFeedback: errors.length ? errors.join('. ') : null,
                formText: formText,
                invalid: errors.length > 0,
                key: name,
                label: ` ${label}`,
                name: name,
                onChange: onInputChange,
                type: type,
                value: value,
            };
        }

        if(type === 'hidden') {
            return {
                disabled: disabled,
                formText: formText,
                key: name,
                name: name,
                onChange: onInputChange,
                type: type,
                value: value,
            };
        }

        if(type === 'datetime') {
            return {
                closeOnSelect: closeOnSelect,
                dateFormat: dateFormat,
                disabled: disabled,
                formFeedback: errors.length ? errors.join('. ') : null,
                formText: formText,
                invalid: errors.length > 0,
                isValidDate: isValidDate,
                key: name,
                label: label,
                locale: 'en-gb',
                name: name,
                onChange: onInputChange,
                placeholder: placeholder,
                timeFormat: timeFormat,
                type: type,
                value: value,
                viewMode: 'days',
            };
        }

        return {
            disabled: disabled,
            emptyOption: emptyOption,
            formFeedback: errors.length ? errors.join('. ') : null,
            formText: formText,
            invalid: errors.length > 0,
            key: name,
            label: label,
            multiple: multiple,
            name: name,
            onCKEditorImageUpload: onCKEditorImageUpload,
            onChange: onInputChange,
            placeholder: placeholder,
            rows: rows,
            type: type,
            value: value,
            values: values,
        };
    });
};

export default getFormGroupsFromResource;
