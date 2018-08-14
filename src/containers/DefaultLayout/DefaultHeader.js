import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
// import PropTypes from 'prop-types';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

// const propTypes = {
//     children: PropTypes.node,
// };
// const defaultProps = {};

export class DefaultHeader extends Component {
    handleLogout() {
        const { token } = this.props
        const data = token;
        console.log(token);
        console.log(data);
        console.log('handling logout');
        this.props.logout({ data });
    }

    render() {
        // eslint-disable-next-line
        const { children, logout, ...attributes } = this.props;

        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <AppNavbarBrand
                    full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
                    minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
                />
                <AppSidebarToggler className="d-md-down-none" display="lg" />
                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink href="/">Dashboard</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <AppHeaderDropdown direction="down">
                        <DropdownToggle nav>
                            <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                        </DropdownToggle>
                        <DropdownMenu right style={{ right: 'auto' }}>
                            <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                            <DropdownItem onClick={() => this.handleLogout()}><i className="fa fa-sign-out"></i> Logout</DropdownItem>
                        </DropdownMenu>
                    </AppHeaderDropdown>
                </Nav>
            </React.Fragment>
        );
    }
}
// DefaultHeader.propTypes = propTypes;
// DefaultHeader.defaultProps = defaultProps;
// export default DefaultHeader;

const mapStateToProps = (state) => {
    return {
        token: state.auth.login.token
    }
};

const mapDispatchToProps = (dispatch) => ({
    logout(data) {
        dispatch({
            type: 'LOGOUT_REQUEST',
            payload: data
        });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultHeader);
