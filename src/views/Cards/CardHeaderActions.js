import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const CardHeaderActions = ({ actions }) => {
    // console.log(actions);

    return (
        <div className="card-header-actions">
            {actions.map((action, idx) => {

                // console.log(action);

                if(action.type === 'button') {
                    return (
                        <CardHeaderButton
                            key={idx}
                            className={action.className}
                            disabled={action.disabled}
                            iconClassName={action.iconClassName}
                            onClick={action.onClick}
                            title={action.title}
                        />
                    );
                }

                if(action.type === 'link') {
                    return (
                        <CardHeaderLink
                            key={idx}
                            className={action.className}
                            href={action.href}
                            iconClassName={action.iconClassName}
                            title={action.title}
                        />
                    );
                }

                return (
                    null
                );
            })}
        </div>
    )
};

export const CardHeaderButton = ({
    className,
    disabled,
    iconClassName,
    onClick,
    title
}) => (
    <Button
        className={`card-header-action btn btn-setting ${className}`}
        disabled={disabled}
        onClick={onClick}
        title={title}
        aria-label={title}
    ><i className={iconClassName}></i></Button>
);

export const CardHeaderLink = ({
    className,
    href,
    iconClassName,
    title
}) => (
    <Link
        to={href}
        className={`card-header-action btn btn-setting ${className}`}
        title={title}
        aria-label={title}
    ><i className={iconClassName}></i></Link>
);

CardHeaderActions.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    iconClassName: PropTypes.string,
    title: PropTypes.string
};

export default CardHeaderActions;
