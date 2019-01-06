import React from 'react';
import PropTypes from 'prop-types';
import SpinnerLoader from '../../../SpinnerLoader';

const LoaderRow = ({
    colSpan,
    columns,
    type,
}) => {
    if(type === 'placeHolderShimmer') {
        return (
            <tr>
                <td colSpan={colSpan}>
                    <SpinnerLoader />
                </td>
            </tr>
        );
    }

    if(type === "spinner") {
        return (
            <tr>
                <td colSpan={colSpan}>
                    <SpinnerLoader />
                </td>
            </tr>
        );
    }

    return (null);
};

LoaderRow.propTypes =  {
    colSpan: PropTypes.number,
    columns: PropTypes.array,
    type: PropTypes.string,
};

export default LoaderRow;
