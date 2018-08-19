import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Alert,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';

import LoadingAlert from '../LoadingAlert';
import ApiErrorAlert from '../ApiErrorAlert';

import getApiErrorMessages from '../../helpers/getApiErrorMessages';

const columns = [
    {
        dataField: 'id',
        text: 'ID',
        sort: true
    },
    {
        dataField: 'name',
        text: 'Name',
        sort: true
    },
    {
        dataField: 'email',
        text: 'Email',
        sort: true
    }
];

const defaultSorted = [
    {
        dataField: 'id',
        order: 'desc'
    }
];

const cellEditProps = {
    mode: 'click'
};

const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
    <div>
        <BootstrapTable
            remote
            keyField="id"
            data={ data }
            columns={ columns }
            defaultSorted={ defaultSorted }
            filter={ filterFactory() }
            pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
            cellEdit={ cellEditFactory(cellEditProps) }
            onTableChange={ onTableChange }
        />
    </div>
);

RemoteAll.propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
    sizePerPage: PropTypes.number.isRequired,
    onTableChange: PropTypes.func.isRequired
};

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            resources: [],
            totalSize: 0,
            sizePerPage: 10
        };

        this.handleTableChange = this.handleTableChange.bind(this);
    }

    componentDidMount() {
        const { resources, token } = this.props;
        // If profile is already in global state
        // Avoid re-fetching
        // console.log(profile);
        if(resources.length === 0) {
            const data = { token };
            console.log(this.props);
            this.props.getPaginatedUsers({ data });
        }
    }

    componentDidUpdate(prevProps) {
        // console.log('prevProps', prevProps);
        if(this.props.resources !== prevProps.resources) {
            // If component is receiving props
            // Set in the state so it can be updated properly
            // avoiding blank fields for ones that do not get updated
            const { resources } = this.props;
            // TODO get actual data
            const totalSize = resources.length;
            const page = 1;
            // this.setState({ resources, page, totalSize });
        }
    }

    handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {
        const currentIndex = (page - 1) * sizePerPage;

        setTimeout(() => {
            let users = this.state.resources;

            // Handle cell editing
            if (type === 'cellEdit') {
                const { rowId, dataField, newValue } = cellEdit;

                users = users.map((row) => {
                    if (row.id === rowId) {
                        const newRow = { ...row };

                        newRow[dataField] = newValue;

                        return newRow;
                    }

                    return row;
                });
            }

            let result = users;

            // Handle column filters
            result = result.filter((row) => {
                let valid = true;

                for (const dataField in filters) {
                    const { filterVal, filterType, comparator } = filters[dataField];

                    if (filterType === 'TEXT') {
                        if (comparator === Comparator.LIKE) {
                            valid = row[dataField].toString().indexOf(filterVal) > -1;
                        } else {
                            valid = row[dataField] === filterVal;
                        }
                    }
                    if (!valid) {
                        break;
                    }
                }

                return valid;
            });

            // Handle column sort
            if (sortOrder === 'asc') {
                result = result.sort((a, b) => {
                    if (a[sortField] > b[sortField]) {
                        return 1;
                    } else if (b[sortField] > a[sortField]) {
                        return -1;
                    }

                    return 0;
                });

            } else {
                result = result.sort((a, b) => {
                    if (a[sortField] > b[sortField]) {
                        return -1;
                    } else if (b[sortField] > a[sortField]) {
                        return 1;
                    }

                    return 0;
                });
            }

            this.setState(() => ({
                page,
                resources: result.slice(currentIndex, currentIndex + sizePerPage),
                totalSize: result.length,
                sizePerPage
            }));

        }, 2000);
    }

    render() {
        const { resources, sizePerPage, page, totalSize } = this.state;
        const { errors, fetching_users } = this.props;

        const Loading = <LoadingAlert msg="Loading Users..." />;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-user"></i>
                                {' '}
                                Users
                            </CardHeader>
                            <CardBody>
                                {fetching_users
                                    ? Loading
                                    : errors.length > 0
                                        ? <ApiErrorAlert errors={errors} />
                                        : (<RemoteAll
                                            data={ resources }
                                            page={ page }
                                            sizePerPage={ sizePerPage }
                                            totalSize={ totalSize }
                                            onTableChange={ this.handleTableChange }
                                        />)
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.users.error);
    const errors = getApiErrorMessages(state.users.error);
    return {
        fetching_users: state.users.fetching_users,
        updating: state.users.updating,
        resources: state.users.resources,
        errors: errors,
        token: state.auth.token,
    }
};

const mapDispatchToProps = (dispatch) => ({
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
