import React, { Suspense } from 'react';
import SpinnerLoader from './SpinnerLoader';

const WaitingComponent = ({
    Component,
    query,
    ...props
}) => (
    <Suspense fallback={<SpinnerLoader />}>
        <Component query={query} {...props} />
    </Suspense>
);

export default WaitingComponent;
