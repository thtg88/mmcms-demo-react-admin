import React, { Component } from 'react';
import { connect } from 'react-redux';
import IndexResource from '../IndexResource';
import {
    getApiErrorMessages,
    isUnauthenticatedError
} from '../../../helpers/apiErrorMessages';
import { apiResourceDestroySuccessNotification } from '../../../helpers/notification';
import { loggedOut } from '../../../redux/auth/actions';
import {
    changePageResources,
    clearMetadataResources,
    getPaginatedResources
} from '../../../redux/role/actions';
import { columns, pageSize } from './tableConfig';

const actions = [
    {
        className: 'btn-success',
        href: '/roles/create',
        title: 'New Resource',
        type: 'link',
        iconClassName: 'fa fa-plus',
    }
];

export class List extends Component {
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

        const {
            getPaginatedResources,
            history,
            token
        } = this.props;
        const { query } = this.state;
        let search_arr = [
            'page=1',
        ];
        if(query) {
            search_arr.push('q='+query);
        }

        this.setState({
            searching: true,
        });

        history.push({
            pathname: '/users',
            search: search_arr.join('&')
        });

        // Fetch first page
        const data = {
            token,
            page: 1,
            pageSize,
            q: query
        };
        getPaginatedResources({ data });
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
            getPaginatedResources,
            query,
            resources,
            token
        } = this.props;

        // console.log(this.props);
        // console.log(this.state);

        if(destroyed === true) {
            apiResourceDestroySuccessNotification({});

            // If resource is destroyed
            // we set the timeout to clear the destroyed data
            // So that when another resource is open,
            // I don't get redirected to the main resources page
            setTimeout(() => {
                const { query } = this.state;
                const data = { query };
                clearMetadataResources({ data });
            }, 500);
        }

        if(typeof getPaginatedResources !== 'undefined') {
            // if query page is not valid
            if(
                typeof query === 'undefined'
                || typeof query.page === 'undefined'
                || isNaN(query.page)
                || query.page <= 0
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
                        q: query.q,
                        token,
                        page,
                        pageSize,
                    };
                    getPaginatedResources({ data });

                } else {
                    // If resources for that page have been fetched before
                    // avoid re-fetching
                }
            } else {
                if(query.q && query.q !== this.state.query) {
                    this.setState({
                        query: query.q,
                        searching: true
                    });
                }

                // Fetch page data
                const data = {
                    q: query.q,
                    token,
                    page: parseInt(query.page, 10),
                    pageSize,
                };
                getPaginatedResources({ data });
            }
        }
    }

    componentDidUpdate(prevProps) {
        const {
            changePageResources,
            fetching_resources,
            getPaginatedResources,
            loggedOut,
            query,
            resources,
            token,
            unauthenticated
        } = this.props;
        const { searching } = this.state;
        const query_page = parseInt(query.page, 10);
        const { q } = query;

        // console.log('this.state', this.state);
        // console.log('this.props', this.props);
        // console.log('prevProps', prevProps);

        // if unauthenticated redirect to login
        if(prevProps.unauthenticated === false && unauthenticated === true) {
            loggedOut();
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
                    q,
                    token,
                    page: query_page,
                    pageSize
                };
                getPaginatedResources({ data });

            } else {
                // If changing page and data is preloaded into state
                // Switch page into global state
                const data = {
                    page: query_page,
                };
                changePageResources({ data });
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
        const { clearMetadataResources } = this.props;
        const { query } = this.state;

        if(typeof clearMetadataResources !== 'undefined') {
            const data = { query };
            clearMetadataResources({ data });
        }
    }

    render() {
        const {
            errors,
            fetching_resources,
            history,
            current_page,
            resources,
            total
        } = this.props;
        const {
            query,
            searching
        } = this.state;

        // console.log(this.props);
        // console.log(this.state);

        return (
            <IndexResource
                actions={actions}
                columns={columns}
                currentPage={current_page}
                errors={errors}
                fetchingResources={fetching_resources}
                history={history}
                listType="list"
                onSearchButtonClick={this.handleSearchResources}
                onSearchInputChange={this.updateSearchInputValue}
                pageSize={pageSize}
                resources={resources}
                resourcesName="Roles"
                searching={searching}
                searchQuery={query}
                total={total}
                urlBuilder={(entity) => '/roles/'+entity.id}
            />
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
    } = state.roles;
    const errors = getApiErrorMessages(error);
    const unauthenticated = isUnauthenticatedError(error);

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

const mapDispatchToProps = {
    changePageResources,
    clearMetadataResources,
    getPaginatedResources,
    loggedOut,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
