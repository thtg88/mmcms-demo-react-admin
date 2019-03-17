import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    FormFeedback,
    FormGroup,
    FormText,
    Label,
} from 'reactstrap';
import FormInput from './FormInput';

const FormGroups = ({ groups }) => {
    if(
        !groups
        || !groups.length
    ) {
        return null;
    }

    return groups.map((group, idx) => {
        const {
            checked,
            className,
            closeOnSelect,
            dataAttributes,
            dateFormat,
            disabled,
            emptyOption,
            formFeedbackText,
            formText,
            inputClassName,
            invalid,
            key,
            label,
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
        } = group;

        if(type === 'checkbox') {
            return (
                <FormGroup key={key} check className={className}>
                    <Label check>
                        <FormInput
                            checked={checked}
                            className={inputClassName}
                            dataAttributes={dataAttributes}
                            disabled={disabled}
                            invalid={invalid}
                            name={name}
                            onChange={onChange}
                            rows={rows}
                            type={type}
                            value={value}
                        />
                        {label}
                    </Label>
                    {
                        formText
                            ? <FormText>{formText}</FormText>
                            : null
                    }
                    {
                        formFeedbackText
                            ? <FormFeedback>{formFeedbackText}</FormFeedback>
                            : null
                    }
                </FormGroup>
            );
        }

        if(type === 'hidden') {
            return (
                <Fragment key={key}>
                    <FormInput
                        className={inputClassName}
                        dataAttributes={dataAttributes}
                        disabled={disabled}
                        invalid={invalid}
                        name={name}
                        onChange={onChange}
                        type={type}
                        value={value}
                    />
                    {
                        formText
                            ? <FormText>{formText}</FormText>
                            : null
                    }
                    {
                        formFeedbackText
                            ? <FormFeedback>{formFeedbackText}</FormFeedback>
                            : null
                    }
                </Fragment>
            );
        }

        return (
            <FormGroup key={key} className={className}>
                <Label htmlFor={name}>{label}</Label>
                <FormInput
                    className={inputClassName}
                    closeOnSelect={closeOnSelect}
                    dataAttributes={dataAttributes}
                    dateFormat={dateFormat}
                    disabled={disabled}
                    emptyOption={emptyOption}
                    invalid={invalid}
                    locale={locale}
                    multiple={multiple}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                    timeFormat={timeFormat}
                    type={type}
                    value={value}
                    values={values}
                    viewMode={viewMode}
                />
                {
                    formText
                        ? <FormText>{formText}</FormText>
                        : null
                }
                {
                    formFeedbackText
                        ? <FormFeedback>{formFeedbackText}</FormFeedback>
                        : null
                }
            </FormGroup>
        );
})
};

FormGroups.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.shape({
        checked: PropTypes.bool,
        className: PropTypes.string,
        dataAttributes: PropTypes.object,
        disabled: PropTypes.bool,
        emptyOption: PropTypes.string,
        formFeedbackText: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
        ]),
        formText: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
        ]),
        inputClassName: PropTypes.string,
        invalid: PropTypes.bool,
        key: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        label: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        rows: PropTypes.number,
        type: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
        ]),
        values: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            value: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
        })),
    })),
};

export default FormGroups;
