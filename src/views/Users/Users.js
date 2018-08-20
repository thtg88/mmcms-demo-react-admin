import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row
} from 'reactstrap';
import ApiErrorAlert from '../ApiErrorAlert';
import DataTable from '../DataTable';
// import UserRow from './UserRow';
import getApiErrorMessages from '../../helpers/getApiErrorMessages';
import { columns } from './tableConfig';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            resources: [],
            total: 0,
            page_size: 10,
            roles: []
        };

        // this.handleTableChange = this.handleTableChange.bind(this);
    }

    componentDidMount() {
        const { resources, roles, token } = this.props;
        // If resources is already in global state
        // Avoid re-fetching
        if(resources.length === 0) {
            const { page, page_size } = this.state;
            const data = { token, page, page_size };
            this.props.getPaginatedUsers({ data });
        } else {
            const { current_page, total_resources } = this.props;
            this.setState({
                resources,
                page: current_page,
                total: total_resources
            })
        }
        // If roles is already in global state
        // Avoid re-fetching
        if(roles.length === 0) {
            const data = { token };
            // this.props.getAllRoles({ data });
        }
    }

    componentDidUpdate(prevProps) {
        // console.log('prevProps', prevProps);
        if(this.props.resources !== prevProps.resources) {
            // If component is receiving props
            // Set in the state so it can be updated properly
            // avoiding blank fields for ones that do not get updated
            const { current_page, total_resources, resources } = this.props;
            this.setState({
                resources,
                page: current_page,
                total: total_resources
            });
        }
    }

    render() {
        const { resources, page_size, page, total } = this.state;
        const { errors, fetching_users, role_errors } = this.props;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
                            </CardHeader>
                            <CardBody>
                                <DataTable
                                    hover={!fetching_users}
                                    columns={columns}
                                    data={resources}
                                    loading={fetching_users}
                                    keyField="id"
                                    urlBuilder={(entity) => '/users/'+entity.id}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const errors = getApiErrorMessages(state.users.error);
    const role_errors = getApiErrorMessages(state.roles.error);
    return {
        errors: errors,
        current_page: state.users.current_page,
        fetching_users: state.users.fetching_users,
        resources: state.users.resources,
        role_errors: role_errors,
        roles: state.roles.resources,
        token: state.auth.token,
        total_resources: state.users.total_resources,
        updating: state.users.updating,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getAllRoles(data) {
        dispatch({
            type: 'GET_ALL_ROLES_REQUEST',
            payload: data
        })
    },
    getPaginatedUsers(data) {
        dispatch({
            type: 'GET_PAGINATED_USERS_REQUEST',
            payload: data
        })
    },
    updateUser(data) {
        dispatch({
            type: 'UPDATE_USER_REQUEST',
            payload: data
        })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);
