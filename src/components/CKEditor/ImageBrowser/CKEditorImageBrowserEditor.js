import React, { forwardRef } from 'react';
import {
    Button,
    ButtonGroup,
    Col,
    Row,
} from 'reactstrap';
import Cropper from 'react-cropper';

const CKEditorImageBrowserEditor = forwardRef(({ imageSrc }, cropperComponent) => {
    return (
        <Row>
            <Col className="col-md-9 col-12">
                <Cropper
                    ref={cropperComponent}
                    src={imageSrc}
                    style={{height: '400px'}}
                />
            </Col>
            <Col className="col-md-3 col-12">
                <Row className="mb-3">
                    <Col className="col-md-12">
                        <ButtonGroup>
                            <Button
                                type="button"
                                onClick={() => cropperComponent.current.cropper.move(-10, 0)}
                                title="Move Left"
                                aria-label="Move Left"
                            >
                                <i className="fa fa-fw fa-arrow-left"></i>
                            </Button>
                            <Button
                                type="button"
                                onClick={() => cropperComponent.current.cropper.move(10, 0)}
                                title="Move Right"
                                aria-label="Move Right"
                            >
                                <i className="fa fa-fw fa-arrow-right"></i>
                            </Button>
                            <Button
                                type="button"
                                onClick={() => cropperComponent.current.cropper.move(0, -10)}
                                title="Move Up"
                                aria-label="Move Up"
                            >
                                <i className="fa fa-fw fa-arrow-up"></i>
                            </Button>
                            <Button
                                type="button"
                                onClick={() => cropperComponent.current.cropper.move(0, 10)}
                                title="Move Down"
                                aria-label="Move Down"
                            >
                                <i className="fa fa-fw fa-arrow-down"></i>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="col-md-12">
                        <ButtonGroup>
                            <Button
                                type="button"
                                onClick={() => cropperComponent.current.cropper.rotate(1)}
                                title="Rotate 1 degree clockwise"
                                aria-label="Rotate 1 degree clockwise"
                            >
                                <i className="fa fa-fw fa-repeat"></i> 1<sup>&deg;</sup>
                            </Button>
                            <Button
                                type="button"
                                onClick={() => cropperComponent.current.cropper.rotate(-1)}
                                title="Rotate 1 degree anti-clockwise"
                                aria-label="Rotate 1 degree anti-clockwise"
                            >
                                <i className="fa fa-fw fa-undo"></i> 1<sup>&deg;</sup>
                            </Button>
                            <Button
                                type="button"
                                onClick={() => cropperComponent.current.cropper.rotate(90)}
                                title="Rotate 90 degree clockwise"
                                aria-label="Rotate 1 degree clockwise"
                            >
                                <i className="fa fa-fw fa-repeat"></i> 90<sup>&deg;</sup>
                            </Button>
                            <Button
                                type="button"
                                onClick={() => cropperComponent.current.cropper.rotate(-90)}
                                title="Rotate 90 degree anti-clockwise"
                                aria-label="Rotate 1 degree anti-clockwise"
                            >
                                <i className="fa fa-fw fa-undo"></i> 90<sup>&deg;</sup>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="col-md-12">
                        <ButtonGroup>
                            <Button
                                type="button"
                                onClick={() => cropperComponent.current.cropper.zoom(0.1)}
                                title="Zoom In"
                                aria-label="Zoom In"
                            >
                                <i className="fa fa-fw fa-search-plus"></i>
                            </Button>
                            <Button
                                type="button"
                                onClick={() => cropperComponent.current.cropper.zoom(-0.1)}
                                title="Zoom Out"
                                aria-label="Zoom Out"
                            >
                                <i className="fa fa-fw fa-search-minus"></i>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
});

export default CKEditorImageBrowserEditor;
