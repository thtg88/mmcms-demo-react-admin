import React, { Suspense } from 'react';
import SpinnerLoader from './SpinnerLoader';

const waitingComponent = (Component, query, props) => (
    <Suspense fallback={<SpinnerLoader />}>
        <Component query={query} {...props} />
    </Suspense>
);

export default waitingComponent;
