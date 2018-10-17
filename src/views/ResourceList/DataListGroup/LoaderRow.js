import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import SpinnerLoader from '../../SpinnerLoader';

const LoaderRow = ({ colSpan }) => (
    <ListGroupItem>
        <SpinnerLoader />
    </ListGroupItem>
);

LoaderRow.propTypes =  {
    colSpan: PropTypes.number
};

export default LoaderRow;
