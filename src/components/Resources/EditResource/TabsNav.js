import React from 'react';
import PropTypes from 'prop-types';
import {
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

const TabsNav = ({
    activeTab,
    isRecovering,
    setActiveTab,
    tabs,
}) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink
                    active={activeTab === 'details'}
                    onClick={() => setActiveTab('details')}
                >
                    <i className="fa fa-fw fa-list"></i>
                    {' '}
                    Details
                </NavLink>
            </NavItem>
            {
                !isRecovering && tabs && tabs.length
                    ? (
                        tabs.map((tab, idx) => {
                            return (
                                <NavItem key={`tab_${tab.name}_${idx}`}>
                                    {
                                        tab.navContent
                                            ? tab.navContent
                                            : (
                                                <NavLink
                                                    active={activeTab === tab.name}
                                                    onClick={() => setActiveTab(tab.name)}
                                                >
                                                    <i className={tab.iconClassName}></i>
                                                    {' '}
                                                    {tab.text}
                                                </NavLink>
                                            )
                                    }
                                </NavItem>
                            );
                        })
                    )
                    : null
            }
        </Nav>
    );
};

TabsNav.propTypes = {
    activeTab: PropTypes.string,
    setActiveTab: PropTypes.func,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            iconClassName: PropTypes.string,
            name: PropTypes.string.isRequired,
            // navContent: PropTypes.string,
            text: PropTypes.string,
        })
    ),
};

export default TabsNav;
