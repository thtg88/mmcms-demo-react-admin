import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import PlaceholderShimmerLoader from '../../PlaceholderShimmerLoader';
import SpinnerLoader from '../../SpinnerLoader';

const LoaderListGroupItem = ({
    columns,
    pageSize,
    type,
}) => {
    if(type === 'placeholderShimmer') {
        // We are always going to show pageSize items so that the transition seems smoother
        const listAmount = [...Array(pageSize).keys()];

        return listAmount.map((value, idx) => (
            <ListGroupItem key={idx}>
                <PlaceholderShimmerLoader
                    columns={columns}
                />
            </ListGroupItem>
        ));
    }

    if(type === 'spinner') {
        return (
            <ListGroupItem>
                <SpinnerLoader />
            </ListGroupItem>
        );
    }

    return null;
};

LoaderListGroupItem.propTypes =  {
    columns: PropTypes.array,
    pageSize: PropTypes.number,
    type: PropTypes.string,
};

LoaderListGroupItem.defaultProps = {
    pageSize: 5,
};

export default LoaderListGroupItem;
