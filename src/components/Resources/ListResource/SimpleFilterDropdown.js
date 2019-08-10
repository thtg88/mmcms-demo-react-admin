import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from 'reactstrap';

const SimpleFilterDropdown = ({
    disabled,
    itemStyle,
    label,
    name,
    operator,
    onDropdownItemClick,
    value,
    values,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const filteredValues = values.filter(tempValue => {
        const fieldName = tempValue.data && tempValue.data.name
            ? tempValue.data.name
            : name;
        let active = tempValue.value === value;
        if(tempValue.data) {
            if(tempValue.data.name && tempValue.data.operator) {
                active = (
                    fieldName === tempValue.data.name
                    && operator === tempValue.data.operator
                    && tempValue.value === value
                );
            } else if (tempValue.data.name) {
                active = (
                    fieldName === tempValue.data.name
                    && tempValue.value === value
                );
            } else if(tempValue.data.operator) {
                active = (
                    operator === tempValue.data.operator
                    && tempValue.value === value
                );
            }
        }

        return active;
    });

    return (
        <Dropdown
            className="filter-dropdown"
            isOpen={isDropdownOpen}
            toggle={() => setIsDropdownOpen(!isDropdownOpen)}
        >
            <ButtonGroup className="d-flex">
                <DropdownToggle
                    block
                    className="text-left filter-dropdown-toggle"
                    disabled={disabled}
                    outline
                >
                    {
                        (value || value === 0) && filteredValues.length > 0
                            ? (
                                <>
                                    Filtered By {label}:
                                    <br />
                                    {filteredValues[0].text}
                                </>
                            )
                            : (
                                <>
                                    Filter By:
                                    {' '}
                                    {label}
                                </>
                            )
                    }
                    <span className="float-right">
                        <i className="fa fa-fw fa-chevron-down"></i>
                    </span>
                </DropdownToggle>
                <Button
                    className="clear-filter-button"
                    color="secondary"
                    onClick={(evt) => {evt.preventDefault();onDropdownItemClick(name, '')}}
                    outline
                    title={`Clear Filter ${label}`}
                    type="button"
                >
                    <i className="fa fa-fw fa-times"></i>
                </Button>
            </ButtonGroup>
            <DropdownMenu className="filter-dropdown-menu">
                {
                    values.map((filterValue, filterValueIdx) => {
                        const fieldName = filterValue.data && filterValue.data.name
                            ? filterValue.data.name
                            : name;
                        const valueOperator = filterValue.data && filterValue.data.operator
                            ? filterValue.data.operator
                            : (
                                operator === 'in'
                                ? operator
                                : '='
                            );
                        let active = filterValue.value === value;
                        if(filterValue.data) {
                            if(filterValue.data.name && filterValue.data.operator) {
                                active = (
                                    fieldName === filterValue.data.name
                                    && operator === filterValue.data.operator
                                    && filterValue.value === value
                                );
                            } else if (filterValue.data.name) {
                                active = (
                                    fieldName === filterValue.data.name
                                    && filterValue.value === value
                                );
                            } else if(filterValue.data.operator) {
                                active = (
                                    operator === filterValue.data.operator
                                    && filterValue.value === value
                                );
                            }
                        }

                        return (
                            <DropdownItem
                                key={`filterValue_${filterValueIdx}`}
                                active={active}
                                onClick={() => onDropdownItemClick(name, fieldName, filterValue.value, valueOperator)}
                                style={itemStyle ? itemStyle : null}
                            >
                                {filterValue.text}
                            </DropdownItem>
                        );
                    })
                }
            </DropdownMenu>
        </Dropdown>
    );
};

SimpleFilterDropdown.propTypes = {
    disabled: PropTypes.bool,
    itemStyle: PropTypes.object,
    label: PropTypes.string,
    name: PropTypes.string,
    operator: PropTypes.string,
    onDropdownItemClick: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    values: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.shape({
                name: PropTypes.string,
                operator: PropTypes.string,
            }),
            text: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
        })
    ),
};

export default SimpleFilterDropdown;
