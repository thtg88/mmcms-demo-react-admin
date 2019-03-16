import React from 'react';
import PropTypes from 'prop-types'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'reactstrap';

const SortDropdown = ({
    isDropdownOpen,
    onDropdownItemClick,
    selectedSortingOption,
    sortButtonDisabled,
    sortingOptions,
    toggleDropdown,
}) => {
    const selectedSortingOptionIconClassName = selectedSortingOption.direction === 'desc'
        ? 'fa fa-fw fa-arrow-down'
        : 'fa fa-fw fa-arrow-up';

    return (
        <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle block disabled={sortButtonDisabled}>
                Sorted By:
                {' '}
                <i className={selectedSortingOptionIconClassName}></i>
                {' '}
                {selectedSortingOption.display_name}
            </DropdownToggle>
            <DropdownMenu className="sort-dropdown-menu">
                {
                    sortingOptions.map((sortingOption, idx) => {
                        const sortingOptionIconClassName = sortingOption.direction === 'desc'
                            ? 'fa fa-fw fa-arrow-down'
                            : 'fa fa-fw fa-arrow-up';
                        const active = sortingOption.direction === selectedSortingOption.direction
                            && sortingOption.name === selectedSortingOption.name;
                        return (
                            <DropdownItem
                                key={`sortingOption${idx}`}
                                active={active}
                                onClick={() => onDropdownItemClick(sortingOption.name, sortingOption.direction)}
                            >
                                <i className={sortingOptionIconClassName}></i>
                                {' '}
                                {sortingOption.display_name}
                            </DropdownItem>
                        );
                    })
                }
            </DropdownMenu>
        </Dropdown>
    );
};

SortDropdown.propTypes = {
    isDropdownOpen: PropTypes.bool,
    onDropdownItemClick: PropTypes.func,
    selectedSortingOption: PropTypes.object,
    sortButtonDisabled: PropTypes.bool,
    sortingOptions: PropTypes.array,
    toggleDropdown: PropTypes.func,
};

export default SortDropdown;
