import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Col,
    Collapse,
    ListGroupItem,
    Row,
} from 'reactstrap';
import ResourceGridItemBody from './ResourceGridItemBody';
import ResourceGridItemHeader from './ResourceGridItemHeader';

const ResourceGridItem = ({
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
    const [showChildren, toggleShowChildren] = useState(false);
    const itemColumnClassName = preItem
        ? (
            (
                (entity.children && entity.children.length)
                || entity.parent_id
            )
                ? 'col-md-9 col-8'
                : 'col-md-10 col-9'
        )
        : 'col-11';
    const listGroupItemProps = {
        action: true,
        className: listGroupItemClassName,
        tag: tag,
    };
    if(tag === 'a') {
        const url = urlBuilder(entity);
        const isInternalUrl = url.indexOf('/') === 0;
        listGroupItemProps.href = url;
        listGroupItemProps.target = isInternalUrl ? undefined : '_blank';
    } else {
        // We assume tag is button
        listGroupItemProps.onClick = () => urlBuilder(entity);
    }

    // TODO investigate children functionality with grid view :-\

    return (
        <>
            <Row>
                {
                    entity.children && entity.children.length
                        ? (
                            <Col className="col-md-1 col-12 my-auto mx-auto pr-0 mx-md-none text-md-left text-center order-last order-md-first">
                                <Button className="btn-ghost-secondary mb-3" onClick={() => toggleShowChildren(!showChildren)} title="Show children">
                                    <i className={`fa fa-lg ${showChildren ? 'fa-minus' : 'fa-plus'}`}></i>
                                </Button>
                            </Col>
                        )
                        : (
                            entity.parent_id
                                ? <Col className="col-1 d-md-block d-none" />
                                : null
                        )
                }
                <Col className={`${entity.children && entity.children.length ? 'col-md-11 col-12 pl-3 pl-md-0' : 'col-12'}`}>
                    <ListGroupItem {...listGroupItemProps}>
                        <Row>
                            {
                                preItem
                                    ? preItem({entity})
                                    : null
                            }
                            <Col className={itemColumnClassName}>
                                <ResourceGridItemHeader
                                    columns={columns}
                                    entity={entity}
                                    nameField={nameField}
                                />
                                <ResourceGridItemBody
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
                </Col>
            </Row>
            {
                entity.children && entity.children.length
                    ? (
                        <Collapse isOpen={showChildren}>
                            <Row>
                                <Col className="col-md-1 d-none d-md-block" />
                                <Col className="col-md-11">
                                    {
                                        entity.children.map((entity, index) => {
                                            const itemClassName = typeof listGroupItemClassName === 'function'
                                                ? listGroupItemClassName(entity)
                                                : listGroupItemClassName;

                                            return (
                                                <ResourceGridItem
                                                    key={entity[keyField]+'_'+index}
                                                    columns={columns}
                                                    history={history}
                                                    keyField={keyField}
                                                    listGroupItemClassName={itemClassName}
                                                    nameField={nameField}
                                                    entity={entity}
                                                    tag={tag}
                                                    urlBuilder={urlBuilder}
                                                    preItem={preItem}
                                                />
                                            );
                                        })
                                    }
                                </Col>
                            </Row>
                        </Collapse>
                    )
                    : null
            }
        </>
    );
}

ResourceGridItem.propTypes = {
    columns: PropTypes.array,
    entity: PropTypes.object,
    history: PropTypes.object,
    keyField: PropTypes.string,
    listGroupItemClassName: PropTypes.string,
    nameField: PropTypes.string,
    preItem: PropTypes.func,
    tag: PropTypes.string,
    urlBuilder: PropTypes.func
};

export default ResourceGridItem;
