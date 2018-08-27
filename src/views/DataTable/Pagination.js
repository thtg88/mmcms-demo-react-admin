import React from 'react';
import PropTypes from 'prop-types';
import {
    Pagination as BootstrapPagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';

const propTypes = {
    history: PropTypes.object,
    page: PropTypes.number,
    page_size: PropTypes.number,
    total: PropTypes.number,
};

const Pagination = ({ history, page, page_size, total }) => {
    const last_page = parseInt(total / page_size, 10) + 1;

    // Create pages empty array from number of pages
    const pages = [...Array(last_page).keys()];

    // console.log(page);

    return (
        <BootstrapPagination className="float-right">
            <PaginationItem
                disabled={page === 1}
                onClick={() => {
                    if(page !== 1) {
                        history.push({pathname: '/users', search: 'page='+(page - 1)});
                    }
                }}
            >
                <PaginationLink
                    previous
                    tag="button"
                ></PaginationLink>
            </PaginationItem>
            {pages.map((key, value) => (
                <PaginationItem
                    key={key}
                    active={value+1 === page}
                    onClick={() => {
                        if(value+1 !== page) {
                            history.push({pathname: '/users', search: 'page='+(value + 1)});
                        }
                    }}
                >
                    <PaginationLink>{value+1}</PaginationLink>
                </PaginationItem>
            ))}
            <PaginationItem
                disabled={page === last_page}
                onClick={() => {
                    if(page !== last_page) {
                        history.push({pathname: '/users', search: 'page='+(page + 1)});
                    }
                }}
            >
                <PaginationLink
                    next
                    tag="button"
                ></PaginationLink>
            </PaginationItem>
        </BootstrapPagination>
    );
}
Pagination.propTypes = propTypes;

export default Pagination;
