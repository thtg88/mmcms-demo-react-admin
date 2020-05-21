import React, { Component } from 'react';
import withCreateResource from './withCreateResource';

const withCreateResourceCallback = (callback) => (ComponentToWrap) => {
    class CreateCallbackHOC extends Component {
        constructor(props) {
            super(props);

            this.component = this.getComponent(props);
        }

        getComponent(props) {
            const params = callback(props);
            const WrappedComponent = (props) => <ComponentToWrap {...props} />;
            const FinalComponent = withCreateResource(params)(WrappedComponent);

            return <FinalComponent {...props} />;
        }

        render() {
            return this.component;
        }
    };

    return CreateCallbackHOC;
};

export default withCreateResourceCallback;
