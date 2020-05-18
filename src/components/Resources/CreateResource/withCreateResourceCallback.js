import React from 'react';
import withCreateResource from './withCreateResource';

const withCreateResourceCallback = (callback) => (ComponentToWrap) => {
    const CreateCallbackHOC = (props) => {
        const params = callback(props);

        return withCreateResource(params)(ComponentToWrap);
    };

    return CreateCallbackHOC;
};

export default withCreateResourceCallback;
