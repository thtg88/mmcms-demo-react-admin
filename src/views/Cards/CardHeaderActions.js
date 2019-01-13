import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const CardHeaderActions = ({ actions }) => (
    <div className="card-header-actions">
        {
            actions.map((action, idx) => {
                const {
                    className,
                    disabled,
                    href,
                    iconClassName,
                    onClick,
                    title,
                    type,
                } = action;

                if(type === 'button') {
                    return (
                        <CardHeaderButton
                            key={idx}
                            className={className}
                            disabled={disabled}
                            iconClassName={iconClassName}
                            onClick={onClick}
                            title={title}
                        />
                    );
                }

                if(type === 'link') {
                    return (
                        <CardHeaderLink
                            key={idx}
                            className={className}
                            href={href}
                            iconClassName={iconClassName}
                            title={title}
                        />
                    );
                }

                return null;
            })
        }
    </div>
);

export const CardHeaderButton = ({
    className,
    disabled,
    iconClassName,
    onClick,
    title,
}) => (
    <Button
        className={`card-header-action btn btn-setting ${className}`}
        disabled={disabled}
        onClick={onClick}
        title={title}
        aria-label={title}
    >
        <i className={iconClassName}></i>
    </Button>
);

export const CardHeaderLink = ({
    className,
    href,
    iconClassName,
    title,
}) => (
    <Link
        to={href}
        className={`card-header-action btn btn-setting ${className}`}
        title={title}
        aria-label={title}
    >
        <i className={iconClassName}></i>
    </Link>
);

CardHeaderActions.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    iconClassName: PropTypes.string,
    title: PropTypes.string,
};

export default CardHeaderActions;
