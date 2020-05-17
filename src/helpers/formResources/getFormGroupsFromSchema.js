const getFormGroupsFromSchema = (
    formSchema,
    onInputChange,
    isRecovering,
    onCKEditorImageUpload,
    dispatchedValuesSearchers,
    disableForm
) => {
    if(!formSchema) {
        return [];
    }

    return Object.entries(formSchema).filter(([name, params], idx) => {
        if(
            // We skip everything that's not undefined
            typeof formSchema[name] === 'undefined'
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
        const closeOnSelect = params.closeOnSelect
            ? params.closeOnSelect
            : undefined;
        const dateFormat = params.dateFormat
            ? params.dateFormat
            : undefined;
        const disabled = isRecovering === true || disableForm === true
            ? true
            : (
                params.disabled
                    ? params.disabled
                    : false
            );
        const emptyOption = params.emptyOption
            ? params.emptyOption
            : '';
        const errors = params.errors
            ? params.errors
            : [];
        const formText = params.formText
            ? params.formText
            : null;
        const isValidDate = params.isValidDate
            ? params.isValidDate
            : undefined;
        const label = params.label
            ? params.label
            : name.charAt(0).toUpperCase()+name.substr(1).replace('_', ' ');
        const multiple = params.multiple
            ? params.multiple
            : false;
        const multipleSelectLimit = params.multipleSelectLimit
            ? params.multipleSelectLimit
            : undefined;
        const placeholder = params.placeholder
            ? params.placeholder
            : `Enter the ${label}`;
        const rows = params.rows
            ? params.rows
            : undefined;
        const step = params.step
            ? params.step
            : undefined;
        const timeFormat = params.timeFormat
            ? params.timeFormat
            : false;
        const type = params.type
            ? params.type
            : 'text';
        const value = params.value === null
            ? ''
            : params.value;
        const values = params.values
            ? params.values
            : [];
        const style = params.style
            ? params.style
            : undefined;
        const timeConstraints = params.timeConstraints
            ? params.timeConstraints
            : undefined;
        const content = params.content
            ? params.content
            : undefined;
        const min = params.min
            ? params.min
            : undefined;

        // This allows for a function to be dispatched on search
        // For now it only applies to react-select as a type
        if(params.valuesSearcher && params.valuesSearcher.searcherName) {
            // Check if there is a dispatchedValuesSearcher
            const dispatchedValuesSearchersFunctions = Object.entries(dispatchedValuesSearchers)
                .filter(([searcherName, dispatchedValuesSearcher], idx) => params.valuesSearcher.searcherName === searcherName)
                .map(tempDispatchedValuesSearcher => tempDispatchedValuesSearcher[1]);

            if(dispatchedValuesSearchersFunctions.length > 0) {
                params.onReactSelectAsyncLoadOptions = dispatchedValuesSearchersFunctions[0];
            }
        }
        const onReactSelectAsyncLoadOptions = params.onReactSelectAsyncLoadOptions
            ? params.onReactSelectAsyncLoadOptions
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
                disabled,
                label,
                name,
                multiple,
                multipleSelectLimit,
                onReactSelectAsyncLoadOptions,
                placeholder,
                style,
                type,
                formFeedbackText: errors.length ? errors.join('. ') : null,
                key: name,
                invalid: errors.length > 0,
                onChange: (selectedOption, extra) => onInputChange(selectedOption, {...extra, name, multiple}),
                value: reactSelectValue,
                values: values.map(option => ({ ...option, label: option.text })),
            };
        }

        if(type === 'checkbox') {
            return {
                disabled,
                formText,
                name,
                style,
                type,
                value,
                checked: value === 1,
                className: 'pb-3',
                formFeedbackText: errors.length ? errors.join('. ') : null,
                invalid: errors.length > 0,
                key: name,
                label: ` ${label}`,
                onChange: onInputChange,
            };
        }

        if(type === 'hidden') {
            return {
                disabled,
                formText,
                name,
                type,
                value,
                key: name,
                onChange: onInputChange,
            };
        }

        if(type === 'react-datetime') {
            return {
                closeOnSelect,
                dateFormat,
                disabled,
                formText,
                isValidDate,
                label,
                name,
                placeholder,
                style,
                timeConstraints,
                timeFormat,
                type,
                value,
                formFeedbackText: errors.length ? errors.join('. ') : null,
                invalid: errors.length > 0,
                key: name,
                locale: 'en-gb',
                onChange: onInputChange,
                viewMode: 'days',
            };
        }

        return {
            content,
            disabled,
            emptyOption,
            formText,
            label,
            min,
            multiple,
            name,
            onCKEditorImageUpload,
            placeholder,
            rows,
            step,
            style,
            type,
            value,
            values,
            formFeedbackText: errors.length ? errors.join('. ') : null,
            invalid: errors.length > 0,
            key: name,
            onChange: onInputChange,
        };
    });
};

export default getFormGroupsFromSchema;
