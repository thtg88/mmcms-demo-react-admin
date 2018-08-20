import React from 'react';
import SpinnerLoader from '../SpinnerLoader';

const LoaderRow = ({ colSpan }) => (
    <tr>
        <td colSpan={colSpan}>
            <SpinnerLoader />
        </td>
    </tr>
);

export default LoaderRow;
