import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import Nprogress from 'nprogress';
import { getApiErrorMessages } from '../../../helpers/apiErrorMessages';
import { apiResourceDestroySuccessNotification } from '../../../helpers/toastNotification';
import { getSortingOptionFromSortNameAndDirection } from '../../../helpers/paginatedResources';

const withListResource = ({
    changePageResources,
    clearMetadataResources,
    defaultSortingOption,
    getPaginatedResources,
    pageSize,
    resourceBaseRoute,
    resourceDisplayName,
    reducerName,
    sortingOptions,
}) => (ComponentToWrap) => {
    class ListHOC extends Component {
        constructor(props) {
            super(props);

            this.fetchPaginatedResources = this.fetchPaginatedResources.bind(this);
            this.generateUri = this.generateUri.bind(this);
            this.handlePageClick = this.handlePageClick.bind(this);
            this.handleRecoverClick = this.handleRecoverClick.bind(this);
            this.handleRecoverDoneClick = this.handleRecoverDoneClick.bind(this);
            this.handleSearchResources = this.handleSearchResources.bind(this);
            this.handleSortDropdownItem = this.handleSortDropdownItem.bind(this);
            this.resetSearchInputValue = this.resetSearchInputValue.bind(this);
            this.updateSearchInputValue = this.updateSearchInputValue.bind(this);

            const uriObj = queryString.parse(props.location.search);

            this.state = {
                isRecovering: parseInt(uriObj.recovery, 10) === 1,
                page: 1,
                query: uriObj.query ? uriObj.query : '',
                searching: false,
                selectedSortingOption: getSortingOptionFromSortNameAndDirection(
                    sortingOptions,
                    uriObj.sort_name,
                    uriObj.sort_direction,
                    defaultSortingOption
                ),
            };
        }

        fetchPaginatedResources() {
            const { getPaginatedResources, token } = this.props;
            const { isRecovering, page, query, selectedSortingOption } = this.state;

            // Fetch first page
            const data = {
                token,
                page,
                pageSize,
                q: query,
                recovery: isRecovering === true ? 1 : 0,
                sort_name: selectedSortingOption.name,
                sort_direction: selectedSortingOption.direction,
            };
            getPaginatedResources({ data });
        }

        generateUri() {
            const { isRecovering, page, query, selectedSortingOption } = this.state;
            const searchArr = [
                'page='+page,
            ];
            if(query) {
                searchArr.push('q='+query);
            }
            if(selectedSortingOption.name) {
                searchArr.push('sort_name='+selectedSortingOption.name);
            }
            if(selectedSortingOption.direction) {
                searchArr.push('sort_direction='+selectedSortingOption.direction);
            }
            if(isRecovering === true) {
                searchArr.push('recovery='+(isRecovering ? 1 : 0));
            }

            return searchArr.join('&');
        }

        handleRecoverClick(evt) {
            const { history } = this.props;

            evt.preventDefault();

            Nprogress.start();

            this.setState(
                {
                    isRecovering: true,
                    query: '',
                    page: 1,
                    selectedSortingOption: getSortingOptionFromSortNameAndDirection(
                        sortingOptions,
                        null,
                        null,
                        defaultSortingOption
                    )
                },
                () => {
                    history.push('/'+resourceBaseRoute+'?recovery=1');

                    this.fetchPaginatedResources();
                }
            );

            Nprogress.inc();
        }

        handleRecoverDoneClick(evt) {
            const { history } = this.props;

            evt.preventDefault();

            Nprogress.start();

            this.setState(
                {
                    isRecovering: false,
                    page: 1,
                    query: '',
                    selectedSortingOption: getSortingOptionFromSortNameAndDirection(
                        sortingOptions,
                        null,
                        null,
                        defaultSortingOption
                    )
                },
                () => {
                    history.push('/'+resourceBaseRoute);

                    this.fetchPaginatedResources();
                }
            );

            Nprogress.inc();
        }

        handlePageClick(page) {
            const { history } = this.props;

            this.setState(
                { page: page > 1 ? page : 1 },
                () => {
                    history.push({
                        pathname: '/'+resourceBaseRoute,
                        search: this.generateUri(),
                    });

                    this.fetchPaginatedResources();
                }
            );
        }

        handleSearchResources(evt) {
            const { history } = this.props;

            evt.preventDefault();

            Nprogress.start();

            this.setState(
                {
                    page: 1,
                    searching: true,
                },
                () => {
                    history.push({
                        pathname: '/'+resourceBaseRoute,
                        search: this.generateUri(),
                    });

                    this.fetchPaginatedResources();
                }
            );

            Nprogress.inc();
        }

        resetSearchInputValue(evt) {
            const { history } = this.props;

            evt.preventDefault();

            Nprogress.start();

            this.setState(
                {
                    page: 1,
                    query: '',
                    searching: true,
                },
                () => {
                    history.push({
                        pathname: '/'+resourceBaseRoute,
                        search: this.generateUri(),
                    });

                    this.fetchPaginatedResources();
                }
            );

            Nprogress.inc();
        }

        updateSearchInputValue(evt) {
            this.setState({
                query: evt.target.value,
            });
        }

        handleSortDropdownItem(name, direction) {
            const { history } = this.props;

            Nprogress.start();

            this.setState(
                {
                    selectedSortingOption: getSortingOptionFromSortNameAndDirection(
                        sortingOptions,
                        name,
                        direction,
                        defaultSortingOption
                    )
                },
                () => {
                    history.push({
                        pathname: '/'+resourceBaseRoute,
                        search: this.generateUri(),
                    });

                    this.fetchPaginatedResources();
                }
            );

            Nprogress.inc();
        }

        componentDidMount() {
            const { clearMetadataResources, destroyed } = this.props;

            if(destroyed === true) {
                apiResourceDestroySuccessNotification({ resourceDisplayName });

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

            Nprogress.start();

            // Fetch first page
            this.fetchPaginatedResources();

            Nprogress.inc();
        }

        componentDidUpdate(prevProps) {
            const { fetching_resources } = this.props;
            const { searching } = this.state;

            // If I have been searching and fetching the resources,
            // and now I have received the resources,
            // set search to off
            if(
                prevProps.fetching_resources === true
                && fetching_resources === false
            ) {
                Nprogress.done();

                if(searching === true) {
                    this.setState({
                        searching: false,
                    });
                }
            }
        }

        componentWillUnmount() {
            const { clearMetadataResources } = this.props;
            const { query } = this.state;

            if(typeof clearMetadataResources !== 'undefined') {
                // This seems to cause an issue on hot module reload
                // Where the component gets unmounted and not remounted correctly
                // If you save a file and the list shows as 0 elements
                // It's because of this, try reload the page which should re-trigger the fetch
                // This should work correctly in production
                // Unless you have a stable solution for development
                // Please leave in place
                const data = { query };
                clearMetadataResources({ data });
            }

            Nprogress.remove();
        }

        render() {
            return (
                <ComponentToWrap
                    onPageClick={this.handlePageClick}
                    onRecoverClick={this.handleRecoverClick}
                    onRecoverDoneClick={this.handleRecoverDoneClick}
                    onSortDropdownItemClick={this.handleSortDropdownItem}
                    onSearchButtonClick={this.handleSearchResources}
                    onSearchInputChange={this.updateSearchInputValue}
                    onSearchInputClear={this.resetSearchInputValue}
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
        } = state[reducerName];
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
