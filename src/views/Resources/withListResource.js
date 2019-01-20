import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApiErrorMessages } from '../../helpers/apiErrorMessages';
import { apiResourceDestroySuccessNotification } from '../../helpers/toastNotification';

const withListResource = (
    ComponentToWrap,
    {
        changePageResources,
        clearMetadataResources,
        defaultSortingOption,
        getPaginatedResources,
        pageSize,
        resourceBaseRoute,
        subStateName,
        sortingOptions,
    }
) => {
    class ListHOC extends Component {
        state = {
            isSortDropdownOpen: false,
            query: '',
            searching: false,
            selectedSortingOption: defaultSortingOption,
        };

        constructor(props) {
            super(props);

            this.fetchPaginatedResources = this.fetchPaginatedResources.bind(this);
            this.generateUri = this.generateUri.bind(this);
            this.handlePageClick = this.handlePageClick.bind(this);
            this.handleSearchResources = this.handleSearchResources.bind(this);
            this.handleSortDropdownItem = this.handleSortDropdownItem.bind(this);
            this.resetSearchInputValue = this.resetSearchInputValue.bind(this);
            this.toggleSortDropdown = this.toggleSortDropdown.bind(this);
            this.updateSearchInputValue = this.updateSearchInputValue.bind(this);
        }

        fetchPaginatedResources() {
            const { getPaginatedResources, token } = this.props;
            const { query, selectedSortingOption } = this.state;

            // Fetch first page
            const data = {
                token,
                pageSize,
                page: 1,
                q: query,
                sort_name: selectedSortingOption.name,
                sort_direction: selectedSortingOption.direction,
            };
            getPaginatedResources({ data });
        }

        generateUri(page = 1) {
            const { query, selectedSortingOption } = this.state;
            let searchArr = [];
            if(page) {
                searchArr.push('page='+page);
            } else {
                searchArr.push('page=1');
            }
            if(query) {
                searchArr.push('q='+query);
            }
            if(selectedSortingOption.name) {
                searchArr.push('sort_name='+selectedSortingOption.name);
            }
            if(selectedSortingOption.direction) {
                searchArr.push('sort_direction='+selectedSortingOption.direction);
            }

            return searchArr.join('&');
        }

        handlePageClick(page) {
            const { history } = this.props;

            history.push({
                pathname: '/'+resourceBaseRoute,
                search: this.generateUri(page),
            });
        }

        handleSearchResources(evt) {
            const { history } = this.props;

            evt.preventDefault();

            this.setState(
                { searching: true },
                () => {
                    history.push({
                        pathname: '/'+resourceBaseRoute,
                        search: this.generateUri(1),
                    });

                    this.fetchPaginatedResources();
                }
            );
        }

        handleSortDropdownItem(name, direction) {
            const { history } = this.props;

            const newSortingOption = sortingOptions.filter(sortOption => {
                return sortOption.name === name && sortOption.direction === direction;
            });

            if(newSortingOption.length > 0) {
                this.setState(
                    { selectedSortingOption: {...newSortingOption[0]}},
                    () => {
                        history.push({
                            pathname: '/'+resourceBaseRoute,
                            search: this.generateUri(1),
                        });

                        this.fetchPaginatedResources();
                    }
                );
            }
        }

        resetSearchInputValue(evt) {
            const { history } = this.props;

            evt.preventDefault();

            this.setState(
                {
                    query: '',
                    searching: true,
                },
                () => {
                    history.push({
                        pathname: '/'+resourceBaseRoute,
                        search: this.generateUri(1),
                    });

                    this.fetchPaginatedResources();
                }
            );
        }

        toggleSortDropdown() {
            const { isSortDropdownOpen } = this.state;

            this.setState({
                isSortDropdownOpen: !isSortDropdownOpen,
            });
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
                paginated_resources,
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
                    || Number.isNaN(query.page)
                    || query.page <= 0
                ) {
                    const page = typeof current_page !== 'undefined' ? current_page : 1;
                    if(
                        // If paginated_resources never fetched
                        typeof paginated_resources === 'undefined'
                        || typeof paginated_resources[page] === 'undefined'
                        // Or was empty (worth re-fetching)
                        || paginated_resources[page].length === 0
                        // Or I've just deleted a resource
                        || destroyed === true
                    ) {
                        // Fetch first page
                        const data = {
                            page,
                            pageSize,
                            token,
                            q: query.q,
                            sort_direction: query.sort_direction,
                            sort_name: query.sort_name,
                        };
                        getPaginatedResources({ data });

                    } else {
                        // If paginated_resources for that page have been fetched before
                        // avoid re-fetching
                    }
                } else {
                    if(query.q && query.q !== this.state.query) {
                        this.setState({
                            query: query.q,
                            searching: true
                        });
                    }
                    if(
                        (
                            query.sort_name
                            && query.sort_name !== this.state.selectedSortingOption.name
                        )
                        || (
                            query.sort_direction
                            && query.sort_direction !== this.state.selectedSortingOption.direction
                        )
                    ) {
                        const newSortingOption = sortingOptions.filter(sortOption => {
                            return sortOption.name === query.sort_name
                                && sortOption.direction === query.sort_direction;
                        });

                        if(newSortingOption.length > 0) {
                            this.setState({
                                selectedSortingOption: {...newSortingOption[0]},
                            });
                        }
                    }

                    // Fetch page data
                    const data = {
                        pageSize,
                        token,
                        page: parseInt(query.page, 10),
                        q: query.q,
                        sort_direction: query.sort_direction,
                        sort_name: query.sort_name,
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
                query,
                paginated_resources,
                token,
            } = this.props;
            const { searching } = this.state;
            const query_page = parseInt(query.page, 10);
            const { q } = query;

            if(
                !Number.isNaN(query_page)
                && query_page > 0
                && query_page !== parseInt(prevProps.query.page, 10)
                && searching === false
            ) {
                if(
                    // If paginated_resources never fetched
                    typeof paginated_resources === 'undefined'
                    || typeof paginated_resources[query_page] === 'undefined'
                    // Or was empty (worth re-fetching)
                    || paginated_resources[query_page].length === 0
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

            // If I have been searching and fetching the paginated_resources,
            // and now I have received the paginated_resources,
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
            return (
                <ComponentToWrap
                    onPageClick={this.handlePageClick}
                    onSortDropdownItemClick={this.handleSortDropdownItem}
                    onSearchButtonClick={this.handleSearchResources}
                    onSearchInputChange={this.updateSearchInputValue}
                    onSearchInputClear={this.resetSearchInputValue}
                    toggleSortDropdown={this.toggleSortDropdown}
                    {...this.props}
                    {...this.state}
                />
            );
        }
    }

    const mapStateToProps = state => {
        const { token } = state.auth;
        const {
            current_page,
            destroyed,
            error,
            fetching_resources,
            paginated_resources,
            total
        } = state[subStateName];
        const errors = getApiErrorMessages(error);

        return {
            current_page,
            destroyed,
            errors,
            fetching_resources,
            paginated_resources,
            token,
            total,
        };
    };

    const mapDispatchToProps = {
        changePageResources,
        clearMetadataResources,
        getPaginatedResources,
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(ListHOC);
};

export default withListResource;
