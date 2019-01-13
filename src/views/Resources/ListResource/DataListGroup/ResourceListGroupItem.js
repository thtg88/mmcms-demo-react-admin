import React from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    ListGroupItem,
    Row,
} from 'reactstrap';
import { get } from '../../../../helpers/formResources';

const ResourceListGroupItem = ({
    columns,
    entity,
    history,
    keyField,
    listGroupItemClassName,
    nameField,
    preItem,
    tag,
    urlBuilder,
}) => {
    const itemColumnClassName = preItem
        ? 'col-md-10 col-9'
        : 'col-11';

    if(tag === 'a') {
        const url = urlBuilder(entity);
        const isInternalUrl = url.indexOf('/') === 0;

        return (
            <ListGroupItem
                action
                tag={tag}
                className={listGroupItemClassName}
                href={url}
                target={isInternalUrl ? undefined : '_blank'}
            >
                <Row>
                    {
                        preItem
                            ? preItem({entity})
                            : null
                    }
                    <Col className={itemColumnClassName}>
                        <ListGroupItemHeader
                            columns={columns}
                            entity={entity}
                            nameField={nameField}
                        />
                        <ListGroupBody
                            columns={columns}
                            entity={entity}
                            keyField={keyField}
                            nameField={nameField}
                        />
                    </Col>
                    <Col className="col-1 my-auto">
                        <i className="fa fa-fw fa-lg fa-chevron-right"></i>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }

    return (
        <ListGroupItem
            action
            tag={tag}
            className={listGroupItemClassName}
            onClick={() => urlBuilder(entity)}
        >
            <Row>
                {
                    preItem
                        ? preItem({entity})
                        : null
                }
                <Col className={itemColumnClassName}>
                    <ListGroupItemHeader
                        columns={columns}
                        entity={entity}
                        nameField={nameField}
                    />
                    <ListGroupBody
                        columns={columns}
                        entity={entity}
                        keyField={keyField}
                        nameField={nameField}
                    />
                </Col>
                <Col className="col-1 my-auto">
                    <i className="fa fa-fw fa-lg fa-chevron-right"></i>
                </Col>
            </Row>
        </ListGroupItem>
    );
};

ResourceListGroupItem.propTypes = {
    columns: PropTypes.array,
    entity: PropTypes.object,
    history: PropTypes.object,
    keyField: PropTypes.string,
    listGroupItemClassName: PropTypes.string,
    nameField: PropTypes.string,
    preItem: PropTypes.func,
    tag: PropTypes.string,
    urlBuilder: PropTypes.func,
};

export default ResourceListGroupItem;

const ListGroupItemHeader = ({
    columns,
    entity,
    nameField,
}) => {
    if(!nameField) {
        return null;
    }

    const nameFieldColumns = columns.filter((column) => {
        return column.dataField === nameField;
    });

    // console.log(nameField);

    if(nameFieldColumns.length === 0) {
        return null;
    }

    const nameFieldColumn = nameFieldColumns[0];

    const value = get(entity, nameFieldColumn.dataField);

    const content = nameFieldColumn.formatter
        ? nameFieldColumn.formatter(value)
        : value;

    return (
        <Row>
            <Col className="col-md-12">
                {
                    nameFieldColumn.text
                        ? <h5>{`${nameFieldColumn.text}: ${content}`}</h5>
                        : <h5>{content}</h5>
                }

            </Col>
        </Row>
    );
};

ListGroupItemHeader.propTypes = {
    columns: PropTypes.array,
    entity: PropTypes.object,
    nameField: PropTypes.string,
};

export const ListGroupBody = ({
    columns,
    entity,
    keyField,
    nameField,
}) => (
    <Row>
        {columns.map((column, idx) => {
            const value = get(entity, column.dataField);
            const content = column.formatter
                ? column.formatter(value)
                : value;

            if(
                column.dataField === keyField
                || column.dataField === nameField
            ) {
                return null;
            }

            const key = 'entity_'+entity[keyField]+'_'+column.dataField+'_'+idx;

            // console.log(key);

            return (
                <Col className={column.className} key={key}>
                    {
                        column.text
                            ? <strong>{`${column.text}: `}</strong>
                            : null
                    }
                    {content}
                </Col>
            );
        })}
    </Row>
);

ListGroupBody.propTypes = {
    columns: PropTypes.array,
    entity: PropTypes.object,
    keyField: PropTypes.string,
    nameField: PropTypes.string,
};
