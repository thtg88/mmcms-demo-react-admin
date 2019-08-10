import escapeRegExp from 'lodash/escapeRegExp';

const replaceUrlParameters = (url, parametersMap) => {
    if(
        !url
        || !url.length
        || !parametersMap
        || typeof parametersMap !== 'object'
    ) {
        return url;
    }

    // This regex matches any alpha-numeric string starting with colon
    const regex = /:(\w+)/g;

    const matches = url.match(regex);

    let newUrl = url;

    if(matches) {
        matches.forEach(parameter => {
            const parameterName = parameter.replace(':', '');

            // We replace all parameters that have a length attribute e.g. string
            // hopefully not arrays :-\
            if(
                parametersMap[parameterName]
                && (
                    typeof parametersMap[parameterName] === 'string'
                    || parametersMap[parameterName] instanceof String
                )
            ) {
                // \\b is the word separator
                const paramRegex = new RegExp(escapeRegExp(parameter)+'\\b', 'g');

                newUrl = newUrl.replace(paramRegex, parametersMap[parameterName]);
            }
        });
    }

    return newUrl;
};

export default replaceUrlParameters;
