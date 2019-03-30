import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import DateTime from 'react-datetime';
import Select from 'react-select';
import CKEditor from '@ckeditor/ckeditor5-react';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CallbackImageUploadAdapterPlugin } from '../helpers/CKEditor';
import moment from 'moment';
import { momentSqlFormat } from '../helpers/dates';
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
    isValidDate,
    locale,
    multiple,
    multipleSelectLimit,
    name,
    onChange,
    onCKEditorImageUpload,
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
                onChange={(selectedOption, extra) => {
                    // We proceed updating if:
                    // 1. It's a multiple select and multipleSelectLimit > 0,
                    // and I do not have already multipleSelectLimit options selected
                    // 2. It's a multiple select and multipleSelectLimit is false-y
                    // 3. It's not a multiple select
                    // 4. I'm removing an option (only possible for multiple selects)
                    // 5. I'm clearing the selected options (only possible for multiple selects)
                    if(

                        (
                            multiple
                            && multipleSelectLimit > 0
                            && value.length < multipleSelectLimit
                        )
                        || (
                            multiple
                            && !multipleSelectLimit
                        )
                        || !multiple
                        || extra.action === 'remove-value'
                        || extra.action === 'clear'
                    ) {
                        onChange(selectedOption, {...extra, name, multiple})
                    }
                }}
                options={values}
                placeholder={placeholder}
                isOptionDisabled={option => !!(option.disabled)}
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
                <option value="">{emptyOption}</option>
                {
                    values.map((option, key) => (
                        <option
                            key={key}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.text}
                        </option>
                    ))
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
        const additionalProps = value
            ? {
                value: dateFormat && timeFormat
                    ? moment(value, momentSqlFormat).format(dateFormat+' '+timeFormat)
                    : moment(value, momentSqlFormat).format(dateFormat)
                }
            : undefined;

        return (
            <DateTime
                closeOnTab
                closeOnSelect={closeOnSelect}
                dateFormat={dateFormat}
                disabled={disabled}
                inputProps={{
                    id: name,
                    name: name,
                    readOnly: true,
                }}
                isValidDate={isValidDate}
                locale={locale}
                onChange={(date) => {
                    const target = {
                        name,
                        value: moment(date).format(momentSqlFormat),
                    };
                    onChange({target}, date);
                }}
                placeholder={placeholder}
                timeFormat={timeFormat}
                viewMode={viewMode}
                {...additionalProps}
            />
        );
    }

    if(type === 'ckeditor') {
        // CKEditor seems to throw issues with disabled={true} on quick in succession re-renders
        // on versions >= v1.1.2, So for now we declare it as not supported
        // See https://github.com/ckeditor/ckeditor5-react/issues/83
        // TOOD test in future disabled={disabled}
        return (
            <CKEditor
                config={{
                    extraPlugins: [CallbackImageUploadAdapterPlugin],
                    removePlugins: ['CKFinder'],
                    callbackImageUploadAdapterPlugin: {
                        onUploadRequest: onCKEditorImageUpload,
                    },
                }}
                data={value}
                editor={ClassicEditor}
                onChange={(event, editor) => {
                    const target = {
                        name,
                        value: editor.getData(),
                    };
                    onChange({ target });
                }}
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
    isValidDate: PropTypes.func,
    locale: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onCKEditorImageUpload: PropTypes.func,
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
    values: PropTypes.array,
    viewMode: PropTypes.string,
}

export default FormInput;
