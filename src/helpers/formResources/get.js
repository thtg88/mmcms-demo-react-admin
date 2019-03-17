const get = (target, field) => {
    if(field === 'resource') {
        return target;
    }

    const pathArray = splitNested(field);
    let result = void 0;

    try {
        result = pathArray.reduce(function (curr, path) {
            return curr[path];
        }, target);
    } catch (e) {}

    return result ? result : null;
};

const splitNested = (str) => {
    return [str].join('.').replace(/\[/g, '.').replace(/\]/g, '').split('.');
};

export default get;
