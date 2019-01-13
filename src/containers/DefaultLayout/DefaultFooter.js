import React from 'react';

const DefaultFooter = () => (
    <>
        <span>
            <a
                href="https://github.com/thtg88/mmcms"
                target="_blank"
                rel="noopener noreferrer"
            >
                mmCMS
            </a>
            {' '}
            &copy; 2018
            {' '}
            <a
                href="https://www.marco-marassi.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                M. Marassi
            </a>.
        </span>
        <span className="ml-auto">
            Powered by
            {' '}
            <a
                href="https://coreui.io/react"
                target="_blank"
                rel="noopener noreferrer"
            >
                CoreUI for React
            </a>
        </span>
    </>
);

export default DefaultFooter;
