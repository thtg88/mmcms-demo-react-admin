import React, { Suspense } from 'react';
import SpinnerLoader from '../components/SpinnerLoader';

const WaitingComponent = ({
    Component,
    query,
    ...props
}) => (
    <Suspense fallback={<SpinnerLoader />}>
        <Component {...props} query={query} />
    </Suspense>
);

export default WaitingComponent;
