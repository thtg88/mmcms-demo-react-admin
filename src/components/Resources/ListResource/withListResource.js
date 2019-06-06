import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import queryString from 'query-string';
import { connect } from 'react-redux';
import PaginatedResourcesFetcher from './PaginatedResourcesFetcher';
import UrlWatcher from './UrlWatcher';
import { getApiErrorMessages } from '../../../helpers/apiMessages';
import { getSelectOptions } from '../../../helpers/formResources';
import { getSortingOptionFromSortNameAndDirection } from '../../../helpers/paginatedResources';
import { apiResourceDestroySuccessNotification } from '../../../helpers/toastNotification';
import { getFiltersFromQueryObject } from '../../../helpers/url';
import { setResources as setImageThumbnails } from '../../../redux/imageThumbnails/actions';
import { pageSize as imageThumbnailsPageSize } from '../../../redux/imageThumbnails/schema';

const withListResource = ({
    changePageResources,
    clearMetadataResources,
    defaultSortingOption,
    filters,
    keyField,
    getPaginatedResources,
    pageSize,
    regenerateThumbnails,
    resourceBaseRoute,
    resourceDisplayName,
    reducerName,
    sequenceField,
    setResources,
    setSequenceResources,
    sortingOptions,
    isAllResourcesFetcherDisabled,
    isPaginatedResourcesFetcherDisabled,
    isUrlWatcherDisabled,
}) => (ComponentToWrap) => {
    // We deep copy emptyFilters so we are sure we are working with a fresh copy in state
    // e.g. no wiriting on old references or for next time we use emptyFilters
    const emptyFilters = filters ? cloneDeep(filters) : [];

    // We loop all the emptyFilters,
    // in order to get valuesFetchers from them
    // These will allow us to dispatch Redux actions,
    // Which ultimately will allow us to populate select values with data coming from the API
    const valuesFetchers = emptyFilters.filter(params => typeof params.valuesFetcher !== 'undefined')
            .map(params => params.valuesFetcher);

    class ListHOC extends Component {
        constructor(props) {
            super(props);

            this.handleDragEnd = this.handleDragEnd.bind(this);
            this.handlePageClick = this.handlePageClick.bind(this);
            this.handleRecoverClick = this.handleRecoverClick.bind(this);
            this.handleRecoverDoneClick = this.handleRecoverDoneClick.bind(this);
            this.handleRegenerateResourcesClick = this.handleRegenerateResourcesClick.bind(this);
            this.handleSearchResources = this.handleSearchResources.bind(this);
            this.handleSimpleFilterDropdownItemClick = this.handleSimpleFilterDropdownItemClick.bind(this);
            this.handleSortDropdownItemClick = this.handleSortDropdownItemClick.bind(this);
            this.reorder = this.reorder.bind(this);
            this.resetSearchInputValue = this.resetSearchInputValue.bind(this);
            this.toggleRegenerateThumbnailsModal = this.toggleRegenerateThumbnailsModal.bind(this);
            this.updateSearchInputValue = this.updateSearchInputValue.bind(this);

            this.state = {
                filters: getFiltersFromQueryObject(props.uriObj, emptyFilters),
                isRecovering: parseInt(props.uriObj.recovery, 10) === 1,
                isResequencing: false,
                page: props.uriObj.page && !isNaN(props.uriObj.page) ? parseInt(props.uriObj.page, 10) : 1,
                query: props.uriObj.q ? props.uriObj.q : '',
                isRegenerateThumbnailsModalOpen: false,
                isRegenerating: false,
                oldResources: [],
                searching: false,
                selectedSortingOption: getSortingOptionFromSortNameAndDirection(
                    sortingOptions,
                    props.uriObj.sort_name,
                    props.uriObj.sort_direction,
                    defaultSortingOption
                ),
            };
        }

        reorder(list, startIndex, endIndex) {
            const result = [...list];
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        }

        handleDragEnd(result) {
            const {
                paginated_resources,
                setResources,
                setSequenceResources,
                token,
            } = this.props;
            const { page } = this.state;

            if(!result.destination) {
                return;
            }

            const newResources = this.reorder(
                paginated_resources[page],
                result.source.index,
                result.destination.index
            ).map((temp_resource, idx) => ({
                ...temp_resource,
                [sequenceField]: idx+1,
            }));

            const resourcesData = {
                resources: [...newResources],
            };
            setResources({ data: resourcesData });

            const data = {
                token,
                sequences: newResources.map((temp_resource, idx) => ({
                    [keyField]: temp_resource[keyField],
                    [sequenceField]: temp_resource[sequenceField],
                })),
            };
            setSequenceResources({ data });

            this.setState({
                isResequencing: true,
                oldResources: [...paginated_resources[page]],
            });
        }

        handlePageClick(page) {
            this.setState({
                page: page > 1 ? page : 1,
            });
        }

        handleRecoverClick(evt) {
            evt.preventDefault();

            this.setState({
                isRecovering: true,
                query: '',
                page: 1,
                selectedSortingOption: getSortingOptionFromSortNameAndDirection(
                    sortingOptions,
                    null,
                    null,
                    defaultSortingOption
                )
            });
        }

        handleRecoverDoneClick(evt) {
            evt.preventDefault();

            this.setState({
                isRecovering: false,
                page: 1,
                query: '',
                selectedSortingOption: getSortingOptionFromSortNameAndDirection(
                    sortingOptions,
                    null,
                    null,
                    defaultSortingOption
                )
            });
        }

        handleRegenerateResourcesClick(evt) {
            const { regenerateThumbnails, token, urlParams } = this.props;

            evt.preventDefault();

            this.setState({
                isRegenerating: true,
            });

            const data = {
                token,
                id: urlParams.image_id,
            };
            regenerateThumbnails({ data });
        }

        handleSearchResources(evt) {
            evt.preventDefault();

            this.setState({
                page: 1,
                searching: true,
            });
        }

        handleSimpleFilterDropdownItemClick(filterName, fieldName, value, operator) {
            const { filters } = this.state;

            this.setState({
                page: 1,
                filters: filters.map(filter => (
                    filter.name === filterName
                        ? {
                            ...filter,
                            fieldName,
                            operator,
                            value,
                        }
                        : {...filter}
                )),
            });
        }

        handleSortDropdownItemClick(name, direction) {
            this.setState({
                selectedSortingOption: getSortingOptionFromSortNameAndDirection(
                    sortingOptions,
                    name,
                    direction,
                    defaultSortingOption
                )
            });
        }

        resetSearchInputValue(evt) {
            evt.preventDefault();

            this.setState({
                page: 1,
                query: '',
                searching: true,
            });
        }

        toggleRegenerateThumbnailsModal(evt) {
            evt.preventDefault();

            const { isRegenerateThumbnailsModalOpen } = this.state;

            this.setState({
                isRegenerateThumbnailsModalOpen: !isRegenerateThumbnailsModalOpen,
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
                destroyed,
                token,
            } = this.props;
            const { filters } = this.state;

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

            const disableFilters = [];
            const filterValues = {};

            // We loop the valuesFetchers from the schema
            // In order to check if we had resources in state,
            // If not we re-fetch them
            filters.forEach((filter, idx) => {
                if(filter.values.length === 0) {
                    if(filter.valuesFetcher) {
                        const valuesFetcher = filter.valuesFetcher;
                        const fetcherName = valuesFetcher.fetcherName;
                        const reducerName = valuesFetcher.reducerName;

                        if(
                            !this.props[reducerName].resources
                            || this.props[reducerName].resources.length === 0
                        ) {
                            // If there are no this.props[valuesFetcher.reducerName].resources
                            // We re-fetch them
                            const data = {
                                token,
                            };
                            this.props[fetcherName]({ data });

                            // While we fetch them, we disable the input
                            // to give a visual feedback to the user
                            // We don't set state here to avoid multiple re-renders
                            disableFilters.push(filter.name);

                        } else {
                            // Otherwise we get them from state and update the schema
                            filterValues[filter.name] = getSelectOptions(
                                this.props[reducerName].resources,
                                filter.selectOptionText,
                                filter.selectOptionValue
                            );
                        }
                    }
                }
            });

            if(disableFilters.length > 0 || Object.keys(filterValues).length > 0) {
                this.setState({
                    filters: filters.map((filter, idx) => {
                        if(disableFilters.indexOf(filter.name) > -1) {
                            return {
                                ...filter,
                                disabled: true,
                            };
                        }

                        if(filterValues[filter.name]) {
                            return {
                                ...filter,
                                values: [
                                    ...filterValues[filter.name]
                                ],
                            };
                        }

                        return {...filter};
                    }),
                });
            }
        }

        componentDidUpdate(prevProps) {
            const {
                errors,
                fetching_resources,
                imageThumbnailsResources,
                regenerated,
                resequenced,
                setImageThumbnails,
                setResources,
            } = this.props;
            const {
                filters,
                isRegenerating,
                isResequencing,
                oldResources,
                searching,
            } = this.state;

            // If I have been searching and fetching the resources,
            // and now I have received the resources,
            // set search to off
            if(
                prevProps.fetching_resources === true
                && fetching_resources === false
            ) {
                if(searching === true) {
                    this.setState({
                        searching: false,
                    });
                }
            }

            //
            else if(
                isRegenerating === true
                && regenerated === true
            ) {
                this.setState({
                    isRegenerating: false,
                    isRegenerateThumbnailsModalOpen: false,
                });

                const data = {
                    pageSize: imageThumbnailsPageSize,
                    resources: imageThumbnailsResources,
                };
                setImageThumbnails({ data });
            }

            //
            else if(
                isRegenerating === true
                && typeof errors.length !== 'undefined'
                && errors.length > 0
            ) {
                this.setState({
                    isRegenerating: false,
                    isRegenerateThumbnailsModalOpen: false,
                });
            }

            // If I was re-arranging the resources and there was an error
            // Reset old global state with previous resources
            else if(
                isResequencing === true
                && typeof errors.length !== 'undefined'
                && errors.length > 0
            ) {
                this.setState({
                    isResequencing: false,
                    oldResources: [],
                });

                const data = {
                    resources: [...oldResources],
                };
                setResources({ data });
            }

            // If I was re-arranging the resources and all went well
            // Reset old local state nonetheless
            else if(
                isResequencing === true
                && resequenced === true
            ) {
                this.setState({
                    isResequencing: false,
                    oldResources: [],
                });
            }

            // We loop the valuesFetchers from the schema
            // In order to check if we had resources or errors coming back
            // so we can update the schema
            filters.forEach(filter => {
                if(filter.valuesFetcher) {
                    const filterName = filter.name;
                    const valuesFetcher = filter.valuesFetcher;
                    const reducerName = valuesFetcher.reducerName;

                    // If I was fetching this.state[`fetching_${valuesFetcher.reducerName}`],
                    // and they have come back, And we update the filters
                    if(
                        prevProps[reducerName].fetching_resources === true
                        && this.props[reducerName].fetching_resources === false
                        && this.props[reducerName].resources
                    ) {
                        this.setState({
                            filters: filters.map((tempFilter, idx) => {
                                if(tempFilter.name === filterName) {
                                    return {
                                        ...tempFilter,
                                        disabled: false,
                                        values: getSelectOptions(
                                            this.props[reducerName].resources,
                                            tempFilter.selectOptionText,
                                            tempFilter.selectOptionValue
                                        ),
                                    }
                                }

                                return {...tempFilter};
                            }),
                        });
                    }
                }
            });
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
        }

        render() {
            const {
                fetching_resources,
                getPaginatedResources,
                history,
                token,
                urlParams,
            } = this.props;
            const {
                filters,
                isRecovering,
                page,
                query,
                searching,
                selectedSortingOption,
            } = this.state;

            return (
                <PaginatedResourcesFetcher
                    enabled={!isPaginatedResourcesFetcherDisabled}
                    fetching_resources={fetching_resources}
                    filters={filters}
                    getPaginatedResources={getPaginatedResources}
                    isRecovering={isRecovering}
                    page={page}
                    pageSize={pageSize}
                    query={query}
                    searching={searching}
                    selectedSortingOption={selectedSortingOption}
                    token={token}
                    urlParams={urlParams}
                >
                    <UrlWatcher
                        enabled={!isUrlWatcherDisabled}
                        filters={filters}
                        history={history}
                        isRecovering={isRecovering}
                        page={page}
                        query={query}
                        resourceBaseRoute={resourceBaseRoute}
                        searching={searching}
                        selectedSortingOption={selectedSortingOption}
                        urlParams={urlParams}
                    >
                        <ComponentToWrap
                            onDragEnd={this.handleDragEnd}
                            onPageClick={this.handlePageClick}
                            onRecoverClick={this.handleRecoverClick}
                            onRecoverDoneClick={this.handleRecoverDoneClick}
                            onRegenerateClick={this.handleRegenerateResourcesClick}
                            onSimpleFilterDropdownItemClick={this.handleSimpleFilterDropdownItemClick}
                            onSortDropdownItemClick={this.handleSortDropdownItemClick}
                            onSearchButtonClick={this.handleSearchResources}
                            onSearchInputChange={this.updateSearchInputValue}
                            onSearchInputClear={this.resetSearchInputValue}
                            toggleRegenerateThumbnailsModal={this.toggleRegenerateThumbnailsModal}
                            {...this.props}
                            {...this.state}
                        />
                    </UrlWatcher>
                </PaginatedResourcesFetcher>
            );
        }
    }

    const mapStateToProps = (state, ownProps) => {
        const { token } = state.auth;
        const {
            destroyed,
            error,
            fetching_resources,
            paginated_resources,
            total
        } = state[reducerName];
        const { regenerated } = state.images;
        const imagesError = state.images.error;
        const imageThumbnailsResources = state.images.resource && state.images.resource.image_thumbnails
            ? state.images.resource.image_thumbnails
            : [];
        const errors = [
            ...getApiErrorMessages(error),
            ...getApiErrorMessages(imagesError),
        ];
        const urlParams = ownProps.match.params;
        const uriObj = queryString.parse(ownProps.location.search);

        const newProps = {
            destroyed,
            errors,
            fetching_resources,
            imageThumbnailsResources,
            paginated_resources,
            regenerated,
            token,
            total,
            urlParams,
            uriObj,
        };

        // We loop the valuesFetchers from the schema
        // So we can add for each one of them additional resources and errors props
        valuesFetchers.forEach(valuesFetcher => {
            newProps[valuesFetcher.reducerName] = {};
            newProps[valuesFetcher.reducerName].fetching_resources = state[valuesFetcher.reducerName].fetching_resources;
            newProps[valuesFetcher.reducerName].resources = state[valuesFetcher.reducerName].resources;
            newProps[valuesFetcher.reducerName].errors = getApiErrorMessages(
                state[valuesFetcher.reducerName].error
            );
        });

        return newProps;
    };

    const mapDispatchToProps = {
        changePageResources,
        clearMetadataResources,
        getPaginatedResources,
        regenerateThumbnails,
        setImageThumbnails,
        setResources,
        setSequenceResources,
    };

    // We add additional dispatch actions for each valuesFetcher from the schema
    valuesFetchers.forEach(valuesFetcher => {
        mapDispatchToProps[valuesFetcher.fetcherName] = valuesFetcher.fetcher;
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(ListHOC);
};

export default withListResource;
