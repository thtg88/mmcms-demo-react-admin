import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const PageTitleButton = ({
    className,
    disabled,
    iconClassName,
    onClick,
    title,
}) => (
    <Button
        className={`btn btn-block mb-4 p-2 ${className}`}
        disabled={disabled}
        onClick={onClick}
        title={title}
        aria-label={title}
    >
        <i className={iconClassName}></i>
        {' '}
        {title}
    </Button>
);

PageTitleButton.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconClassName: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
};

export default PageTitleButton;
