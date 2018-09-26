import React from 'react';
import PropTypes from 'prop-types';
import SpinnerLoader from '../SpinnerLoader';

const LoaderRow = ({ colSpan }) => (
    <tr>
        <td colSpan={colSpan}>
            <SpinnerLoader />
        </td>
    </tr>
);

LoaderRow.propTypes =  {
    colSpan: PropTypes.number
};

export default LoaderRow;
