import React from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Pagination as BootstrapPagination,
    PaginationItem,
    PaginationLink,
    Row,
} from 'reactstrap';

const Pagination = ({
    history,
    onPageClick,
    page,
    pageSize,
    resourceBaseRoute,
    total,
}) => {
    // Create last page from total and page size
    const last_page = parseInt((total - 1) / pageSize, 10) + 1;

    // If last page is 1 don't bother with pagination
    if(last_page === 1) {
        return null;
    }

    // width is the amount of pages to wrap around the current page
    // e.g. if page is 8 it will be shown:
    // <<, 1, ..., 6, 7, 8, 9, 10, ..., last_page, >>
    const width = 2;

    // This will contain the array of pages to show
    let pages = [];

    // We define the current page in case something comes wrong as a prop
    // e.g. someone typing a massive or negative number in the URL
    const current_page = page > last_page
        ? last_page
        : (
            page < 1
                ? 1
                : page
        );

    // If there are more pages than 2*width + 3
    // (this is done for better positioning)
    if(last_page > (1 + width + 1 + width + 1)) {
        // Add first page (always there)
        pages.push(1);

    	if(current_page > width + 2) {
            // Add an ellipsis
    		pages.push('...');
    	}

        // Create an array of 5 elements,
        // basically where the array will be centered around the current page
        // e.g. if width temp_middle_page will be in the form of [0,1,2,3,4]
        const temp_middle_page_keys = [...Array(width * 2 + 1).keys()];

        // here we are centering the array around the current page
        const temp_middle_pages = temp_middle_page_keys.map((value, idx) => {
            return current_page - width + idx;
        });

        // finally we are removing everything that is
        // <= 1 or >= last page (to avoid overlapping with the edges)
        const middle_pages = temp_middle_pages.filter((temp_page) => {
            return temp_page > 1 && temp_page < last_page;
        });

        // And we push it to the actual pages array
        pages.push(...middle_pages);

        // If there are more pages than the last of the middle pages
        // We add an ellipsis
    	if(last_page > current_page + width + 1) {
    		pages.push('...');
    	}

        // Finally add last page (always there)
        pages.push(last_page);

    } else if(last_page > 1) {
        const max_page = Math.min(last_page, 1 + width + 1 + width + 1);

        pages = [...Array(max_page).keys()].map((value, idx) => {
            return value + 1;
        });
    }

    if(!onPageClick) {
        onPageClick = (page) => history.push({
            pathname: '/'+resourceBaseRoute,
            search: 'page='+page
        });
    }

    const pageStart = pageSize * (current_page - 1) + 1;
    const pageEnd = pageStart + pageSize - 1;

    return (
        <Row>
            <Col className="col-md-4 col-12">
                <p>Showing {pageStart} - {pageEnd} of {total} items</p>
            </Col>
            <Col className="col-md-8 col-12">
                <BootstrapPagination className="float-right">
                    <PaginationItem
                        disabled={current_page === 1}
                        onClick={() => {
                            if(current_page !== 1) {
                                onPageClick(current_page - 1);
                            }
                        }}
                    >
                        <PaginationLink previous tag="button"></PaginationLink>
                    </PaginationItem>
                    {
                        pages.map((value, key) => {
                            return (
                                <PaginationItem
                                    key={key}
                                    disabled={value === current_page || value === '...'}
                                    active={value === current_page}
                                    onClick={() => {
                                        if(value !== current_page && value !== '...') {
                                            onPageClick(value);
                                        }
                                    }}
                                >
                                    <PaginationLink tag="button">{value}</PaginationLink>
                                </PaginationItem>
                            );
                        })
                    }
                    <PaginationItem
                        disabled={current_page === last_page}
                        onClick={() => {
                            if(current_page !== last_page) {
                                onPageClick(current_page + 1);
                            }
                        }}
                    >
                        <PaginationLink next tag="button"></PaginationLink>
                    </PaginationItem>
                </BootstrapPagination>
            </Col>
        </Row>
    );
};

Pagination.propTypes = {
    history: PropTypes.object.isRequired,
    onPageClick: PropTypes.func,
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    resourceBaseRoute:PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    total: PropTypes.number.isRequired,
};

export default Pagination;
