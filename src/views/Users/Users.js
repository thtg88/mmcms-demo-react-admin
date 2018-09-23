import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row
} from 'reactstrap';
import CardHeaderActions from '../CardHeaderActions';
import ApiErrorCard from '../ApiErrorCard';
import DataTable from '../DataTable';
import getApiErrorMessages from '../../helpers/getApiErrorMessages';
import { columns, pageSize } from './tableConfig';

const actions = [
    {
        href: '/users/create',
        title: 'New Resource',
        iconClassName: 'fa fa-plus',
    }
];

class Users extends Component {
    componentDidMount() {
        const { current_page, query, resources, roles, token } = this.props;

        // console.log(this.props);
        // console.log(this.state);

        // if query page is not valid
        if(
            (
                typeof query.page === 'undefined'
                || isNaN(query.page)
                || query.page <= 0
            )
        ) {
            const page = typeof current_page !== 'undefined' ? current_page : 1;
            if(
                // If resources never fetched
                typeof resources === 'undefined'
                || typeof resources[page] === 'undefined'
                // Or was empty (worth re-fetching)
                || resources[page].length === 0
            ) {
                // Fetch first page
                const data = {
                    token,
                    page,
                    pageSize
                };
                this.props.getPaginatedUsers({ data });

            } else {
                // If resources for that page have been fetched before
                // avoid re-fetching
            }
        } else {
            // Fetch page data
            const data = {
                token,
                page: parseInt(query.page, 10),
                pageSize
            };
            this.props.getPaginatedUsers({ data });
        }

        // If roles is already in global state
        // Avoid re-fetching
        if(roles.length === 0) {
            // const data = { token };
            // this.props.getAllRoles({ data });
        }
    }

    componentDidUpdate(prevProps) {
        // console.log('this.state', this.state);
        // console.log('this.props', this.props);
        // console.log('prevProps', prevProps);

        const { query, resources, token } = this.props;
        const query_page = parseInt(query.page, 10);

        if(
            !isNaN(query_page)
            && query_page > 0
            && query_page !== parseInt(prevProps.query.page, 10)
        ) {
            if(
                // If resources never fetched
                typeof resources === 'undefined'
                || typeof resources[query_page] === 'undefined'
                // Or was empty (worth re-fetching)
                || resources[query_page].length === 0
            ) {

                // If changing page and page is valid
                // Re-fetch page
                const data = {
                    token,
                    page: query_page,
                    pageSize
                };

                this.props.getPaginatedUsers({ data });

            } else {
                // If changing page and data is preloaded into state
                // Switch page into global state
                const data = {
                    page: query_page,
                };

                this.props.changePageUsers({ data });
            }
        }
    }

    componentWillUnmount() {
        this.props.clearMetadataUsers();
    }

    render() {
        const {
            errors,
            fetching_users,
            history,
            current_page,
            resources,
            // role_errors,
            total
        } = this.props;

        // console.log(this.props);
        // console.log(this.state);
        // console.log('columns', columns);
        // console.log('resources', resources);
        // console.log('current_page', current_page);

        if(
            (
                (
                    typeof resources === 'undefined'
                    || typeof current_page === 'undefined'
                    || typeof resources[current_page] === 'undefined'
                )
                && !fetching_users
            )
            || typeof total === 'undefined'
        ) {
            return (null);
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        {errors.length && !fetching_users > 0
                            ? <ApiErrorCard errors={errors} />
                            : <Card className="card-accent-primary">
                                <CardHeader>
                                    <i className="fa fa-users"></i> Users
                                    <CardHeaderActions actions={actions} />
                                </CardHeader>
                                <CardBody>
                                    <DataTable
                                        hover={!fetching_users}
                                        columns={columns}
                                        data={resources[current_page]}
                                        loading={fetching_users}
                                        keyField="id"
                                        urlBuilder={(entity) => '/users/'+entity.id}
                                        page={current_page}
                                        total={total}
                                        pageSize={pageSize}
                                        history={history}
                                    />
                                </CardBody>
                            </Card>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const errors = getApiErrorMessages(state.users.error);
    const role_errors = getApiErrorMessages(state.roles.error);
    const {
        current_page,
        fetching_users,
        resources,
        total
    } = state.users;

    console.log(state.users);

    return {
        current_page: current_page,
        errors: errors,
        fetching_users: fetching_users,
        resources: resources,
        role_errors: role_errors,
        roles: state.roles.resources,
        token: state.auth.token,
        total: total
    };
};

const mapDispatchToProps = (dispatch) => ({
    changePageUsers(data) {
        dispatch({
            type: 'CHANGE_PAGE_USERS',
            payload: data
        })
    },
    clearMetadataUsers(data) {
        dispatch({
            type: 'CLEAR_METADATA_USERS'
        })
    },
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
