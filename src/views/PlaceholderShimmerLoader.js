import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

const PlaceholderShimmerLoader = ({ columns }) => {
    const lastColumnIdx = columns.length - 1;

    return (
        <>
            <Row className="placeholder-shimmer-loader-row">
                <Col className="col-3">
                    <div className="animated-background" style={{height: '20px', marginBottom: '15px'}}></div>
                </Col>
            </Row>
            <Row className="placeholder-shimmer-loader-row">
                {columns.map((column, colIdx) => {
                    if(column.dataField === 'id') {
                        return (null);
                    }

                    let columnClassName;
                    if(colIdx === lastColumnIdx) {
                        columnClassName = 'col-4';
                    } else {
                        columnClassName = column.className;
                    }

                    return (
                        <Col key={colIdx} className={columnClassName}>
                            <div
                                className="animated-background"
                                style={{height: '14px'}}
                            ></div>
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};

PlaceholderShimmerLoader.propTypes = {
    columns: PropTypes.array,
};

export default PlaceholderShimmerLoader;
