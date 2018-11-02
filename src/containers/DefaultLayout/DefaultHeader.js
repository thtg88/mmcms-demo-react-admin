import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem
} from 'reactstrap';
import {
    AppHeaderDropdown,
    AppNavbarBrand,
    AppSidebarToggler
} from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';
import { logout } from '../../redux/auth/actions';

export class DefaultHeader extends Component {
    state = {
        redirect_profile: false
    };

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.redirectProfile = this.redirectProfile.bind(this);
    }

    handleLogout() {
        const { logout, token } = this.props;

        // console.log(token);
        // console.log(data);
        // console.log('handling logout');

        if(typeof logout !== 'undefined') {
            const data = token;

            logout({ data });
        }
    }

    redirectProfile() {
        this.props.history.push('/me')
    }

    render() {
        return (
            <>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <AppNavbarBrand
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
                    <AppHeaderDropdown direction="down">
                        <DropdownToggle nav>
                            <img
                                src={process.env.PUBLIC_URL+"/assets/img/avatars/6.jpg"}
                                className="img-avatar"
                                alt="admin@bootstrapmaster.com"
                            />
                        </DropdownToggle>
                        <DropdownMenu right style={{ right: 'auto' }}>
                            <DropdownItem onClick={this.redirectProfile}>
                                <i className="fa fa-user"></i> Profile
                            </DropdownItem>
                            <DropdownItem onClick={this.handleLogout}>
                                <i className="fa fa-sign-out"></i> Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </AppHeaderDropdown>
                </Nav>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
};

const mapDispatchToProps = {
    logout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultHeader);
