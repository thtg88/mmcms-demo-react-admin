import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Button,
    ButtonGroup,
    Col,
    Row,
} from 'reactstrap';

const PageTitle = ({
    actions,
    text,
    wrap,
}) => {
    // If there are no actions I will set the different width,
    // otherwise default to full width
    const titleClassName = actions && actions.length && !wrap
        ? 'col-md-6 col-12'
        : 'col-12';
    const actionsClassName = actions
        ? (
            wrap
                ? 'col-12'
                : 'col-md-6 col-12'
        )
        : null;

    return (
        <Row>
            <Col className={titleClassName}>
                <h1 className="page-title">
                    <span>{text}</span>
                </h1>
            </Col>
            {
                actions
                ? (
                    <Col className={actionsClassName}>
                        <ButtonGroup className="d-flex">
                            {
                                actions.map((action, idx) => {
                                    if(action.type === 'button') {
                                        return (
                                            <PageTitleButton
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
                                            <PageTitleLink
                                                key={idx}
                                                className={action.className}
                                                href={action.href}
                                                iconClassName={action.iconClassName}
                                                title={action.title}
                                            />
                                        );
                                    }

                                    return null;
                                })
                            }
                        </ButtonGroup>
                    </Col>
                )
                : null
            }
        </Row>
    );
};

PageTitle.propTypes = {
    actions: PropTypes.array,
    text: PropTypes.string.isRequired,
    wrap: PropTypes.bool,
};

export const PageTitleButton = ({
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

export const PageTitleLink = ({
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

export default PageTitle;
