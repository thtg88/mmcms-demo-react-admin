import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Col,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import FormInput from '../../FormInput';

export const SearchBar = ({
    buttonDisabled,
    iconClassName,
    onSubmit,
    onChange,
    onClear,
    query,
    textInputPlaceholder,
}) => (
    <Form className="form-horizontal">
        <FormGroup row onSubmit={onSubmit}>
            <Col className="col-md-12">
                <InputGroup>
                    <FormInput
                        type="text"
                        name="search"
                        onChange={onChange}
                        placeholder={textInputPlaceholder}
                        value={query}
                    />
                    <InputGroupAddon addonType="append">
                        <Button
                            type="button"
                            color="danger"
                            onClick={onClear}
                            disabled={!query || buttonDisabled}
                        >
                            <i className="fa fa-times"></i>
                            {' '}
                            <span className="d-md-inline-block d-none">Clear</span>
                        </Button>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append">
                        <Button
                            type="submit"
                            color="primary"
                            onClick={onSubmit}
                            disabled={buttonDisabled}
                        >
                            <i className={iconClassName}></i>
                            {' '}
                            <span className="d-md-inline-block d-none">Search</span>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </Col>
        </FormGroup>
    </Form>
);

SearchBar.propTypes = {
    buttonDisabled: PropTypes.bool,
    iconClassName: PropTypes.string,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    query: PropTypes.string,
    textInputPlaceholder: PropTypes.string,
};

export default SearchBar;
