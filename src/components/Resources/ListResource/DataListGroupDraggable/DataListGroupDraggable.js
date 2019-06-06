import React from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    ListGroup,
    Row
} from 'reactstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LoaderListGroupItem from '../LoaderListGroupItem';
import EmptyListGroupItem from '../EmptyListGroupItem';
import ResourceListGroupItem from './ResourceListGroupItem';
import SearchBar from '../SearchBar';

const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? "lightblue" : "lightgrey",
    // padding: grid,
    // width: 250
});

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    // userSelect: "none",
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const DataListGroupDraggable = ({
    columns,
    data,
    history,
    hover,
    keyField,
    listgroupItemTag,
    loading,
    nameField,
    onDragEnd,
    onSearchButtonClick,
    onSearchInputChange,
    onSearchInputClear,
    pageSize,
    preItem,
    query,
    resourceBaseRoute,
    resourceItemClassName,
    searchButtonDisabled,
    searchButtonIconClassName,
    searchEnabled,
    searchTextInputPlaceholder,
    selectedSortingOption,
    urlBuilder,
    urlParams,
}) => {
    return (
        <>
            {
                searchEnabled === true
                    ? (
                        <Row>
                            <Col className="col-12">
                                <SearchBar
                                    buttonDisabled={searchButtonDisabled}
                                    iconClassName={searchButtonIconClassName}
                                    onChange={onSearchInputChange}
                                    onClear={onSearchInputClear}
                                    onSubmit={onSearchButtonClick}
                                    query={query}
                                    textInputPlaceholder={searchTextInputPlaceholder}
                                />
                            </Col>
                        </Row>
                    )
                    : null
            }
            <ListGroup flush className="mb-3">
                {
                    loading
                        ? (
                            <LoaderListGroupItem
                                columns={columns}
                                pageSize={pageSize}
                                type="placeholderShimmer"
                            />
                        )
                        : (
                            data.length > 0
                                ? (
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable droppableId="droppable">
                                            {
                                                (provided, snapshot) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}
                                                    >
                                                        {
                                                            data.map((entity, index) => {
                                                                const listGroupItemClassName = typeof resourceItemClassName === 'function'
                                                                    ? resourceItemClassName(entity)
                                                                    : resourceItemClassName;

                                                                return (
                                                                    <Draggable
                                                                        key={entity[keyField]+'_'+index}
                                                                        draggableId={entity[keyField]}
                                                                        index={index}
                                                                    >
                                                                        {
                                                                            (provided, snapshot) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    style={getItemStyle(
                                                                                        snapshot.isDragging,
                                                                                        provided.draggableProps.style
                                                                                    )}
                                                                                >
                                                                                    <ResourceListGroupItem
                                                                                        columns={columns}
                                                                                        dragHandleProps={provided.dragHandleProps}
                                                                                        history={history}
                                                                                        keyField={keyField}
                                                                                        listGroupItemClassName={listGroupItemClassName}
                                                                                        nameField={nameField}
                                                                                        entity={entity}
                                                                                        tag={listgroupItemTag}
                                                                                        urlBuilder={urlBuilder}
                                                                                        preItem={preItem}
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </Draggable>
                                                                );
                                                            })
                                                        }
                                                        {provided.placeholder}
                                                    </div>
                                                )
                                            }
                                        </Droppable>
                                    </DragDropContext>
                                )
                                : <EmptyListGroupItem />
                        )
                }
            </ListGroup>
        </>
    );
};

DataListGroupDraggable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array.isRequired,
    history: PropTypes.object,
    hover: PropTypes.bool,
    keyField: PropTypes.string,
    listgroupItemTag: PropTypes.string,
    loading: PropTypes.bool,
    nameField: PropTypes.string,
    onSearchButtonClick: PropTypes.func,
    onSearchInputChange: PropTypes.func,
    onSearchInputClear: PropTypes.func,
    pageSize: PropTypes.number,
    preItem: PropTypes.func,
    query: PropTypes.string,
    resourceBaseRoute: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    resourceItemClassName: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    searchButtonDisabled: PropTypes.bool,
    searchButtonIconClassName: PropTypes.string,
    searchEnabled: PropTypes.bool,
    searchTextInputPlaceholder: PropTypes.string,
    urlBuilder: PropTypes.func,
    urlParams: PropTypes.object,
};

export default DataListGroupDraggable;
