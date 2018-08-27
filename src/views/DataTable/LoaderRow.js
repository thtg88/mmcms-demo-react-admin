import React from 'react';
import SpinnerLoader from '../SpinnerLoader';

const LoaderRow = ({ colSpan }) => {
    // console.log(colSpan);

    return (
        <tr>
            <td colSpan={colSpan}>
                <SpinnerLoader />
            </td>
        </tr>
    )
};

export default LoaderRow;
