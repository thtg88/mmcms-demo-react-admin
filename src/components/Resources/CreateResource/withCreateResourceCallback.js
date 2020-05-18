import React from 'react';
import withCreateResource from './withCreateResource';

const withCreateResourceCallback = (callback) => (ComponentToWrap) => {
    const CreateCallbackHOC = (props) => {
        return <ComponentToWrap {...props} {...callback(props)} />;
    };

    return CreateCallbackHOC;
};

export default withCreateResourceCallback;
