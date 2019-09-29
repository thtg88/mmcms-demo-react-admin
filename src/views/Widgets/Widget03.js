import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const Widget03 = ({
    children,
    className,
    cssModule,
    dataBox,
}) => {
    // demo purposes only
    const data = dataBox();
    const variant = data.variant;

    if (!variant || ['facebook', 'twitter', 'linkedin', 'google-plus'].indexOf(variant) < 0) {
        return null;
    }

    const back = 'bg-' + variant;
    const icon = 'fa fa-' + variant;
    const keys = Object.keys(data);
    const vals = Object.values(data);
    const classCard = 'brand-card';
    const classCardHeader = classNames(`${classCard}-header`, back);
    const classCardBody = classNames(`${classCard}-body`);
    const classes = mapToCssModules(classNames(classCard, className), cssModule);

    return (
        <div className={classes}>
            <div className={classCardHeader}>
                <i className={icon}></i>
                {children}
            </div>
            <div className={classCardBody}>
                <div>
                    <div className="text-value">{vals[1]}</div>
                    <div className="text-uppercase text-muted small">{keys[1]}</div>
                </div>
                <div>
                    <div className="text-value">{vals[2]}</div>
                    <div className="text-uppercase text-muted small">{keys[2]}</div>
                </div>
            </div>
        </div>
    );
};

Widget03.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    cssModule: PropTypes.object,
    dataBox: PropTypes.func,
};

Widget03.defaultProps = {
    dataBox: () => ({ variant: 'facebook', friends: '-', feeds: '-' }),
};

export default Widget03;
