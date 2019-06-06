import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import PlaceholderShimmerLoader from '../../../PlaceholderShimmerLoader';
import SpinnerLoader from '../../../SpinnerLoader';

const LoaderGridItem = ({
    columns,
    pageSize,
    type,
}) => {
    if(type === 'placeholderShimmer') {
        // We are always going to show pageSize items so that the transition seems smoother
        const listAmount = [...Array(pageSize).keys()];

        return (
            <Row>
                {
                    listAmount.map((value, idx) => (
                        <Col className="mb-3 col-md-4 col-12" key={idx}>
                            <div className="p-2">
                                <PlaceholderShimmerLoader columns={columns} />
                            </div>
                        </Col>
                    ))
                }
            </Row>
        );
    }

    if(type === 'spinner') {
        return (
            <Row>
                <Col className="col-md-12 col-12">
                    <SpinnerLoader />
                </Col>
            </Row>
        );
    }

    return null;
};

LoaderGridItem.propTypes =  {
    columns: PropTypes.array,
    pageSize: PropTypes.number,
    type: PropTypes.string,
};

LoaderGridItem.defaultProps = {
    pageSize: 5,
};

export default LoaderGridItem;
