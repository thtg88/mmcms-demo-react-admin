import React from 'react';
import PropTypes from 'prop-types';

const EmptyRow = ({ colSpan }) => (
    <tr>
        <td colSpan={colSpan}>No matching records found.</td>
    </tr>
);

EmptyRow.propTypes = {
    colSpan: PropTypes.number
};

export default EmptyRow;
