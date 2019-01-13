import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import DateTime from 'react-datetime';
import Select from 'react-select';
import 'moment/locale/en-gb';

const FormInput = ({
    checked,
    className,
    closeOnSelect,
    dataAttributes,
    dateFormat,
    disabled,
    emptyOption,
    invalid,
    locale,
    multiple,
    name,
    onChange,
    placeholder,
    rows,
    timeFormat,
    type,
    value,
    values,
    viewMode,
}) => {
    if(type === 'react-select') {
        return (
            <Select
                id={name}
                name={name}
                value={value}
                invalid={invalid}
                isDisabled={disabled}
                isMulti={multiple}
                isSearchable={true}
                onChange={(selectedOption, extra) => onChange(selectedOption, {...extra, name, multiple})}
                options={values}
                placeholder={placeholder}
            />
        );
    }

    if(type === 'select') {
        return (
            <Input
                className={className}
                disabled={disabled}
                id={name}
                invalid={invalid}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                value={value}
                {...dataAttributes}
            >
                <option value={null}>{emptyOption}</option>
                {
                    values.map((option, key) => (
                        <option
                            key={key}
                            value={option.value}
                        >
                            {option.text}
                        </option>
                    )
                    )
                }
            </Input>
        );
    }

    if(type === 'checkbox') {
        return (
            <Input
                checked={checked}
                className={className}
                disabled={disabled}
                id={name}
                invalid={invalid}
                name={name}
                onChange={onChange}
                type={type}
                value={value}
                {...dataAttributes}
            />
        );
    }

    if(type === 'textarea') {
        return (
            <Input
                className={className}
                disabled={disabled}
                id={name}
                invalid={invalid}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                type={type}
                value={value}
                {...dataAttributes}
            />
        );
    }

    if(type === 'datetime') {
        return (
            <DateTime
                closeOnTab
                closeOnSelect={closeOnSelect}
                dateFormat={dateFormat}
                disabled={disabled}
                inputProps={{
                    id: name,
                    name: name,
                }}
                locale={locale}
                onChange={onChange}
                placeholder={placeholder}
                timeFormat={timeFormat}
                viewMode={viewMode}
            />
        );
    }

    return (
        <Input
            className={className}
            disabled={disabled}
            id={name}
            invalid={invalid}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            value={value}
            {...dataAttributes}
        />
    );
};

FormInput.propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    closeOnSelect: PropTypes.bool,
    dataAttributes: PropTypes.object,
    dateFormat: PropTypes.string,
    disabled: PropTypes.bool,
    emptyOption: PropTypes.string,
    invalid: PropTypes.bool,
    locale: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    timeFormat: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]),
    values: PropTypes.array,
    viewMode: PropTypes.string,
}

export default FormInput;
