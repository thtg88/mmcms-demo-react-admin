import React from 'react';

const EmptyRow = ({ colSpan }) => (
    <tr>
        <td colSpan={colSpan}>No matching records found.</td>
    </tr>
);

export default EmptyRow;
