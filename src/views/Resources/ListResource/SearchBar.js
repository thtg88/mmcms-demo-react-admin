import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

export const SearchBar = ({
    buttonDisabled,
    iconClassName,
    onSubmit,
    onChange,
    query,
}) => (
    <Form className="form-horizontal">
        <FormGroup row onSubmit={onSubmit}>
            <Col md="12">
                <InputGroup>
                    <Input
                        type="text"
                        id="search"
                        name="search"
                        onChange={onChange}
                        placeholder="Search"
                        value={query}
                    />
                    <InputGroupAddon addonType="append">
                        <Button
                            type="submit"
                            color="primary"
                            onClick={onSubmit}
                            disabled={buttonDisabled}
                        >
                            <i className={iconClassName}></i>
                            {' '}
                            Search
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
    query: PropTypes.string,
};

export default SearchBar;
