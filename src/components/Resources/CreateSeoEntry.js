import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const CreateSeoEntry = ({
    buttonIconClassName,
    creating,
    handleCreate,
    resourceDisplayName,
}) => (
    <>
        <p>No SEO for this {resourceDisplayName}.</p>
        <Button
            type="button"
            color="success"
            onClick={handleCreate}
            disabled={creating}
        >
            <i className={buttonIconClassName}></i>
            {' '}
            Create SEO
        </Button>
    </>
);

CreateSeoEntry.propTypes = {
    buttonIconClassName: PropTypes.string,
    creating: PropTypes.bool,
    handleCreate: PropTypes.func,
    resourceDisplayName: PropTypes.string,
};

export default CreateSeoEntry;
