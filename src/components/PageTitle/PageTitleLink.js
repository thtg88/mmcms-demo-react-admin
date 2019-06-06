import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PageTitleLink = ({
    className,
    href,
    iconClassName,
    title,
}) => (
    <Link to={href} aria-label={title} className={`btn btn-block mb-4 p-2 ${className}`}>
        <i className={iconClassName}></i>
        {' '}
        {title}
    </Link>
);

PageTitleLink.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    iconClassName: PropTypes.string,
    title: PropTypes.string,
};

export default PageTitleLink;
