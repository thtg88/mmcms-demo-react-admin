import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    UncontrolledDropdown,
} from 'reactstrap';
import {
    AppNavbarBrand,
    AppSidebarToggler
} from '@coreui/react';
import { logout } from '../../redux/auth/actions';
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';

export class DefaultHeader extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        const { logout, token } = this.props;

        if(typeof logout !== 'undefined') {
            const data = token;

            logout({ data });
        }
    }

    render() {
        return (
            <>
                <AppSidebarToggler
                    className="d-lg-none"
                    display="md"
                    mobile
                />
                <AppNavbarBrand
                    tag={Link}
                    to="/dashboard"
                    full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
                    minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
                />
                <AppSidebarToggler className="d-md-down-none" display="lg" />
                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown direction="down">
                        <DropdownToggle nav>
                            <img
                                src={process.env.PUBLIC_URL+"/assets/img/avatars/6.jpg"}
                                className="img-avatar"
                                alt="admin@bootstrapmaster.com"
                            />
                        </DropdownToggle>
                        <DropdownMenu right style={{ right: 'auto' }}>
                            <DropdownItem tag={Link} to="/me">
                                <i className="fa fa-user"></i>
                                {' '}
                                Profile
                            </DropdownItem>
                            <DropdownItem onClick={this.handleLogout}>
                                <i className="fa fa-sign-out"></i> Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </>
        );
    }
}

const mapStateToProps = state => {
    const { token } = state.auth;

    return {
        token: token ? token : null,
    };
};

const mapDispatchToProps = {
    logout,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultHeader);
