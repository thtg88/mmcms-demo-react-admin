import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    FormFeedback,
    FormGroup,
    FormText,
    Label,
    Row,
} from 'reactstrap';
import FormInput from './FormInput';

const { REACT_APP_API_BASE_URL } = process.env;

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
            onReactSelectAsyncLoadOptions,
            emptyOption,
            formFeedbackText,
            formText,
            inputClassName,
            invalid,
            isValidDate,
            key,
            label,
            locale,
            multiple,
            multipleSelectLimit,
            name,
            onCKEditorImageUpload,
            onChange,
            placeholder,
            rows,
            step,
            timeFormat,
            type,
            value,
            values,
            viewMode,
        } = group;

        if(type === 'img') {
            return (
                <Row key={key}>
                    <Col className="col-md-6 col-12 mb-3">
                        <img
                            src={`${REACT_APP_API_BASE_URL}${value}`}
                            alt=""
                            className="img-fluid"
                        />
                    </Col>
                </Row>
            );
        }

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
                    onReactSelectAsyncLoadOptions={onReactSelectAsyncLoadOptions}
                    emptyOption={emptyOption}
                    invalid={invalid}
                    isValidDate={isValidDate}
                    locale={locale}
                    multiple={multiple}
                    multipleSelectLimit={multipleSelectLimit}
                    name={name}
                    onCKEditorImageUpload={onCKEditorImageUpload}
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
                    multipleSelectLimit
                        ? <FormText>You may select a maximum of {multipleSelectLimit} option(s) from the dropdown.</FormText>
                        : null
                }
                {
                    formText
                        ? <FormText>{formText}</FormText>
                        : null
                }
                {
                    formFeedbackText
                        ? <FormFeedback style={{display:'block'}}>{formFeedbackText}</FormFeedback>
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
        isValidDate: PropTypes.func,
        key: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        label: PropTypes.string,
        locale: PropTypes.string,
        multiple: PropTypes.bool,
        multipleSelectLimit: PropTypes.number,
        name: PropTypes.string,
        onCKEditorImageUpload: PropTypes.func,
        onChange: PropTypes.func,
        onReactSelectAsyncLoadOptions: PropTypes.func,
        placeholder: PropTypes.string,
        rows: PropTypes.number,
        type: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                text: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                ]),
                value: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                ]),
            }),
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
