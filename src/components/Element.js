import React, { Component } from 'react';
import {
    Stage,
    Layer,
    Rect,
    Circle,
    Arrow,
    Transformer,
    Text
} from 'react-konva';
import { Manager, Reference, Popper } from 'react-popper';
import joint from 'jointjs'
import $ from 'jquery'

export default class Element extends Component {

    constructor(props) {
        super(props);
        this.state = {
            positionforSqure: [],
            positionforCircle: []
        }
    }

    dragBound = (type, pos) => {
        let squrearray = [];
        let circlearray = [];
        let newY = pos.y < 0
            ? 0
            : pos.y;
        let newX = pos.x < 0
            ? 0
            : pos.x;

        let data = { corinate: { x: newX, y: newY }, type: type }
        return { x: newX, y: newY }
    }


    renderElement = () => {
        console.log(this.props)
        const { type, position } = this.props;
        const { x, y } = position;
        switch (type) {
            case "square":
                // return <Rect
                //     x={x - 256}
                //     y={y - 50}
                //     width={100}
                //     height={100}
                //     fill="transparent"
                //     stroke="black"
                //     strokeWidth={1}
                //     lineJoin="round"
                //     draggable
                //     dragBoundFunc={this.dragBound.bind(this, "square")}
                //     onDragEnd={this.updateData}
                // />;
                   return new joint.shapes.devs.Model({
                    position: { x: 50, y: 50 },
                    size: { width: 90, height: 90 },
                    inPorts: ['in1', 'in2'],
                    outPorts: ['out'],
                    ports: {
                        groups: {
                            'in': {
                                attrs: {
                                    '.port-body': {
                                        fill: '#16A085'
                                    }
                                }
                            },
                            'out': {
                                attrs: {
                                    '.port-body': {
                                        fill: '#E74C3C'
                                    }
                                }
                            }
                        }
                    },
                    attrs: {
                        '.label': { text: 'Model', 'ref-x': .5, 'ref-y': .2 },
                        rect: { fill: '#2ECC71' }
                    }
        
                });
                

            case "circle":
                return <Circle
                    x={x - 206}
                    y={y}
                    radius={50}
                    fill="transparent"
                    stroke="black"
                    strokeWidth={1}
                    draggable
                    dragBoundFunc={this.dragBound.bind(this, "circle")}
                    onDragEnd={this.updateData}
                />;

            case "arrow":
                return <Arrow
                    points={[0, 0, 50, 50]}
                    // points={[square.corinate.x, square.corinate.y, circle.corinate.x, circle.corinate.y]}
                    stroke="black"
                    strokeWidth={4}
                    draggable
                    dragBoundFunc={this.dragBound.bind(this, "arrow")}
                />
            default:
                return null;
        }
    }

    render() {
        return (this.renderElement());
    }
}