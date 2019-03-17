import get from './get';

const getSelectOptions = (resources, textField, valueField, disabledValues = [], depth = 0) => {
    if(
        !resources
        || !resources.length
    ) {
        return [];
    }

    const options = resources.reduce((result, resource, idx) => {

        let text = '';
        if(depth > 0) {
            // If I'm processing children resources,
            // We prefill the text with spaces (nbsp)
            // to have an indentation effect
            // We start for one as we decide not to indent the first child
            for (let i = 1; i < depth; i++) {
                text = `${String.fromCharCode(160)}${String.fromCharCode(160)}${String.fromCharCode(160)}${String.fromCharCode(160)}${text}`;
            }

            // After, if it's the last children we show box drawings light up and right,
            // Otherwise a box drawings light vertical and right
            if(idx === resources.length - 1) {
                text = `${text} ${String.fromCharCode(0x2514)} `;
            } else {
                text = `${text} ${String.fromCharCode(0x251C)} `;
            }
        }
        // If text is a function,
        // We execute it passing the resource so it can compute the value
        if(typeof textField === 'function') {
            text = `${text}${textField(resource)}`;
        } else {
            text = `${text}${get(resource, textField)}`;
        }

        // If value is a function,
        // We execute it passing the resource so it can compute the value
        let value;
        if(typeof valueField === 'function') {
            value = valueField(resource);
        } else {
            value = get(resource, valueField);
        }

        const option = {
            text,
            value,
            disabled: disabledValues.indexOf(value) > -1,
        };

        let childrenOptions = [];
        if(resource.children) {
            childrenOptions = getSelectOptions(resource.children, textField, valueField, disabledValues, depth + 1);
        }

        return [
            ...result,
            option,
            ...childrenOptions,
        ];

    }, []);

    // console.log(options);

    return options;
};

export default getSelectOptions;
