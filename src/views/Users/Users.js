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
import ApiResourceDestroySuccessCard from '../ApiResourceDestroySuccessCard';
import DataTable from '../DataTable';
import { getApiErrorMessages, isUnauthenticatedError } from '../../helpers/apiErrorMessages';
import { columns, pageSize } from './tableConfig';

const actions = [
    {
        className: 'btn-outline-success',
        href: '/users/create',
        title: 'New Resource',
        type: 'link',
        iconClassName: 'fa fa-plus',
    }
];

class Users extends Component {
    state = {
        query: '',
        searching: false,
    };

    constructor(props) {
        super(props);

        this.handleSearchResources = this.handleSearchResources.bind(this);
        this.updateSearchInputValue = this.updateSearchInputValue.bind(this);
    }

    handleSearchResources(evt) {
        evt.preventDefault();

        const { history, token } = this.props;
        const { query } = this.state;

        this.setState({
            searching: true,
        });

        history.push({pathname: '/users', search: 'page=1'});

        // Fetch first page
        const data = {
            token,
            page: 1,
            pageSize,
            q: query
        };
        this.props.getPaginatedResources({ data });
    }

    updateSearchInputValue(evt) {
        this.setState({
            query: evt.target.value,
        });
    }

    componentDidMount() {
        const {
            clearMetadataResources,
            current_page,
            destroyed,
            query,
            resources,
            token
        } = this.props;

        // console.log(this.props);
        // console.log(this.state);

        if(destroyed === true) {
            setTimeout(() => {
                const { query } = this.state;
                const data = { query };
                clearMetadataResources({ data });
            }, 1000);
        }

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
                // Or I've just deleted a resource
                || destroyed === true
            ) {
                // Fetch first page
                const data = {
                    q: this.state.query,
                    token,
                    page,
                    pageSize,
                };
                this.props.getPaginatedResources({ data });

            } else {
                // If resources for that page have been fetched before
                // avoid re-fetching
            }
        } else {
            // Fetch page data
            const data = {
                q: this.state.query,
                token,
                page: parseInt(query.page, 10),
                pageSize,
            };
            this.props.getPaginatedResources({ data });
        }
    }

    componentDidUpdate(prevProps) {
        const {
            fetching_resources,
            query,
            resources,
            token,
            unauthenticated
        } = this.props;
        const { searching } = this.state;
        const query_page = parseInt(query.page, 10);

        // console.log('this.state', this.state);
        // console.log('this.props', this.props);
        // console.log('prevProps', prevProps);

        // if unauthenticated redirect to login
        if(prevProps.unauthenticated === false && unauthenticated === true) {
            this.props.loggedOut();
        }

        else if(
            !isNaN(query_page)
            && query_page > 0
            && query_page !== parseInt(prevProps.query.page, 10)
            && searching === false
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
                    q: this.state.query,
                    token,
                    page: query_page,
                    pageSize
                };
                this.props.getPaginatedResources({ data });

            } else {
                // If changing page and data is preloaded into state
                // Switch page into global state
                const data = {
                    page: query_page,
                };

                this.props.changePageResources({ data });
            }
        }

        // If I have been searching and fetching the resources,
        // and now I have received the resources,
        // set search to off
        else if(
            searching === true
            && prevProps.fetching_resources === true
            && fetching_resources === false
        ) {
            this.setState({
                searching: false
            })
        }
    }

    componentWillUnmount() {
        const { query } = this.state;
        const data = { query };
        this.props.clearMetadataResources({ data });
    }

    render() {
        const {
            destroyed,
            errors,
            fetching_resources,
            history,
            current_page,
            resources,
            total
        } = this.props;
        const { searching } = this.state;

        // console.log(this.props);
        // console.log(this.state);

        if(
            (
                (
                    typeof resources === 'undefined'
                    || typeof current_page === 'undefined'
                    || typeof resources[current_page] === 'undefined'
                )
                && !fetching_resources
            )
            || typeof total === 'undefined'
        ) {
            return (null);
        }

        let searchButtonIconClassName = "fa fa-search";
        if(searching === true && fetching_resources === true) {
            searchButtonIconClassName = "fa fa-spinner fa-spin";
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <ApiErrorCard errors={errors} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={12}>
                        <ApiResourceDestroySuccessCard success={destroyed} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={12}>
                        <Card className="card-accent-primary">
                            <CardHeader className="h1">
                                Users
                                <CardHeaderActions actions={actions} />
                            </CardHeader>
                            <CardBody>
                                <DataTable
                                    columns={columns}
                                    data={resources[current_page]}
                                    history={history}
                                    hover={!fetching_resources}
                                    keyField="id"
                                    loading={fetching_resources}
                                    page={current_page}
                                    pageSize={pageSize}
                                    total={total}
                                    urlBuilder={(entity) => '/users/'+entity.id}
                                    onSearchButtonClick={this.handleSearchResources}
                                    onSearchInputChange={this.updateSearchInputValue}
                                    query={this.state.query}
                                    searchButtonDisabled={this.state.searching}
                                    searchButtonIconClassName={searchButtonIconClassName}
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
    const {
        current_page,
        destroyed,
        error,
        fetching_resources,
        resources,
        total
    } = state.users;
    const errors = getApiErrorMessages(error);
    const unauthenticated = isUnauthenticatedError(error);

    // console.log(state.users);

    return {
        current_page: current_page,
        destroyed: destroyed,
        errors: errors,
        fetching_resources: fetching_resources,
        resources: resources,
        token: state.auth.token,
        total: total,
        unauthenticated: unauthenticated
    };
};

const mapDispatchToProps = (dispatch) => ({
    changePageResources(data) {
        dispatch({
            type: 'CHANGE_PAGE_USERS',
            payload: data
        })
    },
    clearMetadataResources(data) {
        dispatch({
            type: 'CLEAR_METADATA_USERS',
            payload: data
        })
    },
    getPaginatedResources(data) {
        dispatch({
            type: 'GET_PAGINATED_USERS_REQUEST',
            payload: data
        })
    },
    loggedOut(data) {
        dispatch({
            type: 'LOGGED_OUT',
            payload: data
        })
    },
    updateResource(data) {
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
