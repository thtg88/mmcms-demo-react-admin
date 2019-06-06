import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { ButtonGroup, Col, Row } from 'reactstrap';
import PageTitleButton from './PageTitleButton';
import PageTitleLink from './PageTitleLink';

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
        <>
            <Helmet>
                <title>{`${text}`} | Admin | Castle Combe Circuit</title>
            </Helmet>
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
        </>
    );
};

PageTitle.propTypes = {
    actions: PropTypes.array,
    text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    wrap: PropTypes.bool,
};

export default PageTitle;
