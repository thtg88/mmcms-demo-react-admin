import { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { replaceUrlParameters } from '../../../helpers/url';

class UrlWatcher extends Component {
    constructor(props) {
        super(props);

        this.generateUri = this.generateUri.bind(this);
    }

    generateUri() {
        const {
            filters,
            isRecovering,
            page,
            query,
            selectedSortingOption,
        } = this.props;
        const searchArr = [
            'page='+page,
        ];

        if(query) {
            searchArr.push('q='+query);
        }

        if(selectedSortingOption && selectedSortingOption.name) {
            searchArr.push('sort_name='+selectedSortingOption.name);
        }
        if(selectedSortingOption && selectedSortingOption.direction) {
            searchArr.push('sort_direction='+selectedSortingOption.direction);
        }

        filters.filter(filter => !!filter.value || filter.value === 0)
            .forEach(({name, fieldName, operator, value}, idx) => {
                searchArr.push(`filters[${idx}][name]=${name}`);
                searchArr.push(`filters[${idx}][fieldName]=${fieldName}`);
                searchArr.push(`filters[${idx}][operator]=${operator}`);
                searchArr.push(`filters[${idx}][value]=${value}`);
            });

        if(isRecovering === true) {
            searchArr.push('recovery='+(isRecovering ? 1 : 0));
        }

        return searchArr.join('&');
    }

    componentDidUpdate(prevProps) {
        const {
            enabled,
            filters,
            history,
            isRecovering,
            page,
            resourceBaseRoute,
            searching,
            selectedSortingOption,
            urlParams,
        } = this.props;

        if(enabled === true) {
            const prevFilterValues = prevProps.filters.map(({name, fieldName, value, operator}) => ({name, fieldName, value, operator}));
            const filterValues = filters.map(({name, fieldName, value, operator}) => ({name, fieldName, value, operator}));

            if(
                prevProps.isRecovering !== isRecovering
                || prevProps.page !== page
                || prevProps.searching !== searching
                || prevProps.selectedSortingOption !== selectedSortingOption
                || !isEqual(prevFilterValues, filterValues)
            ) {
                history.push({
                    pathname: '/'+replaceUrlParameters(resourceBaseRoute, urlParams),
                    search: this.generateUri(),
                });
            }
        }
    }

    render() {
        return this.props.children;
    }
}

export default UrlWatcher;
