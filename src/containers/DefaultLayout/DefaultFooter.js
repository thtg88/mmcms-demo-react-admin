import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class DefaultFooter extends Component {
    render() {

        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <Fragment>
                <span>
                    <a
                        href="https://github.com/thtg88/mmcms"
                        target="_blank"
                        rel="noopener noreferrer"
                    >mmCMS</a>
                    {" "}
                    &copy; 2018 Marco Marassi.
                </span>
                <span className="ml-auto">
                    Powered by
                    {" "}
                    <a
                        href="https://coreui.io/react"
                        target="_blank"
                        rel="noopener noreferrer"
                    >CoreUI for React</a>
                </span>
            </Fragment>
        );
    }
}

DefaultFooter.propTypes = {
    children: PropTypes.node,
};
DefaultFooter.defaultProps = {};

export default DefaultFooter;
