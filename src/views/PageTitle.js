import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';

const PageTitle = ({
    actions,
    text
}) => {
    // If there are no actions I will set the different width,
    // otherwise default to full width
    let titleColProps = {
        sm: 12
    };
    if(actions) {
        titleColProps = {
            lg: 10,
            md: 9,
            sm: 8
        };
    }

    return (
        <Row>
            <Col {...titleColProps}>
                <h1 className="title">
                    <span>{text}</span>
                </h1>
            </Col>
            {
                actions
                ? (
                    <Col lg={2} md={3} sm={4}>
                        {
                            actions.map((action, idx) => {

                                // console.log(action);

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

                                return (null);
                            })
                        }
                    </Col>
                )
                : (null)
            }
        </Row>
    );
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

export default PageTitle;
