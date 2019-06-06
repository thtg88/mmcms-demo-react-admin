import React, { useState } from 'react';
import PropTypes from 'prop-types'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'reactstrap';

const SortDropdown = ({
    onDropdownItemClick,
    selectedSortingOption,
    sortButtonDisabled,
    sortingOptions,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const selectedSortingOptionIconClassName = selectedSortingOption.direction === 'desc'
        ? 'fa fa-fw fa-arrow-down'
        : 'fa fa-fw fa-arrow-up';

    return (
        <Dropdown
            className="sort-dropdown"
            isOpen={isDropdownOpen}
            toggle={() => setIsDropdownOpen(!isDropdownOpen)}
        >
            <DropdownToggle
                className="sort-dropdown-toggle"
                disabled={sortButtonDisabled}
                block
                outline
            >
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
    onDropdownItemClick: PropTypes.func,
    selectedSortingOption: PropTypes.object,
    sortButtonDisabled: PropTypes.bool,
    sortingOptions: PropTypes.array,
};

export default SortDropdown;
