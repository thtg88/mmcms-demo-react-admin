import { Component } from 'react';
import isEqual from 'lodash/isEqual';
import Nprogress from 'nprogress';

class AllResourcesFetcher extends Component {
    constructor(props) {
        super(props);

        this.fetchAllResources = this.fetchAllResources.bind(this);
    }

    fetchAllResources() {
        const {
            filters,
            getAllResources,
            isRecovering,
            page,
            pageSize,
            query,
            selectedSortingOption,
            token,
            urlParams,
        } = this.props;

        // Fetch first page
        const data = {
            ...urlParams,
            token,
            page,
            pageSize,
            filters: filters.filter(filter => !!filter.value || filter.value === 0)
                .map(({name, fieldName, value, operator}) => ({name, fieldName, value, operator})),
            q: query,
            recovery: isRecovering === true ? 1 : 0,
        };
        if(selectedSortingOption) {
            data.sort_name = selectedSortingOption.name;
            data.sort_direction = selectedSortingOption.direction;
        }

        getAllResources({ data });
    }

    componentDidMount() {
        const { enabled } = this.props;

        if(enabled === true) {
            Nprogress.start();

            // Fetch first page
            this.fetchAllResources();

            Nprogress.inc();
        }
    }

    componentDidUpdate(prevProps) {
        const {
            enabled,
            fetching_resources,
            filters,
            isRecovering,
            page,
            searching,
            selectedSortingOption,
        } = this.props;

        if(enabled === true) {
            const prevFilterValues = prevProps.filters.map(({name, value, operator}) => ({name, value, operator}));
            const filterValues = filters.map(({name, value, operator}) => ({name, value, operator}));

            if(
                prevProps.isRecovering !== isRecovering
                || prevProps.page !== page
                || prevProps.searching !== searching
                || prevProps.selectedSortingOption !== selectedSortingOption
                || !isEqual(prevFilterValues, filterValues)
            ) {
                Nprogress.start();

                this.fetchAllResources();

                Nprogress.inc();
            }

            // If I have been searching and fetching the resources,
            // and now I have received the resources,
            // set search to off
            else if(
                prevProps.fetching_resources === true
                && fetching_resources === false
            ) {
                Nprogress.done();
            }
        }
    }

    componentWillUnmount() {
        Nprogress.done();
        Nprogress.remove();
    }

    render() {
        return this.props.children;
    }
}

export default AllResourcesFetcher;
