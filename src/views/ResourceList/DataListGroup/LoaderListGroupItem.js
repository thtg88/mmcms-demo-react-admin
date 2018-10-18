import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import PlaceholderShimmerLoader from '../../PlaceholderShimmerLoader';
import SpinnerLoader from '../../SpinnerLoader';

const LoaderListGroupItem = ({
    columns,
    type,
}) => {
    if(type === 'placeholderShimmer') {
        const listAmount = [...Array(5).keys()];

        return listAmount.map((value, idx) => (
            <ListGroupItem key={idx} tag="button" action onClick={() => {}}>
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

    return (null);
};

LoaderListGroupItem.propTypes =  {
    columns: PropTypes.array,
    type: PropTypes.string,
};

export default LoaderListGroupItem;
