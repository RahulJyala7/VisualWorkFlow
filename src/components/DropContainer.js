import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Stage, Layer, Transformer } from 'react-konva';
import Element from './Element';
import JointjsDemo from './jointjs'
import joint from 'jointjs'
import $ from 'jquery'

const Types = {
    ELEMENT: 'element'
};

const elementTarget = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        const position = monitor.getSourceClientOffset();
        component.getItem(item.name, position);
        return { item };
    }
};

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

class DropContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: []
        }
    }

    // getItem = (type, position) => {
    //     debugger
    //     const {item} = this.state;
    //     let tmpArr;
    //     tmpArr = item;
    //     tmpArr.push(<Element type={type} position={position}/>);
    //     console.log(tmpArr)
    //     return this.setState({item: tmpArr});
    // }

    getItem = (type, position) => {
        //joint js helpers
        var erd = joint.shapes.erd;
        var dia = joint.dia;
        var util = joint.util;
        var standard = joint.shapes.standard;
        //end
        let temparray = [];
        let text ;
        switch (type) {
            case "square":
               text = `Modal${position.x}`
                temparray.push(new joint.shapes.devs.Model({
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
                        '.label': { text: text, 'ref-x': .5, 'ref-y': .2 },
                        rect: { fill: '#2ECC71' }
                    }

                }))
                return this.setState({item : temparray})

            case "decision":
                text = `Poligon${position.x}`
                temparray.push(
                    new joint.shapes.standard.Rectangle({
                        position: { x: position.x, y: position.y },
                        size: { width: 90, height: 80 },
                        attrs: {
                            body: {
                                strokeWidth: 5,
                                stroke: 'black',
                                rx: 3,
                                ry: 3,
                                fill: 'lightgray',
                            },
                            label: {
                                text: text,
                                fontSize: 10,
                                style: { 'text-shadow': '1px 1px 1px lightgray' }
                            }
                        }                           
                    })                    
                )
                return this.setState({item : temparray})

                case "circle":
                    text = `Circle${position.x}`
                    temparray.push(
                        new joint.shapes.standard.Circle({
                            position: { x: position.x, y: position.y },
                            size: { width: 90, height: 80 },
                            attrs: {
                                body: {
                                    strokeWidth: 5,
                                    stroke: 'black',
                                    rx: 3,
                                    ry: 3,
                                    fill: 'lightgray',
                                },
                                label: {
                                    text: text,
                                    fontSize: 10,
                                    style: { 'text-shadow': '1px 1px 1px lightgray' }
                                }
                            }                           
                        })
                    )
                 return this.setState({item : temparray})

                case "arrow":
                  return this.setState({item : temparray})
                    
                 case "defalut":
                      return null
        }
        console.log(temparray)
        return this.setState({ item: temparray })
    }

    render() {
        const { connectDropTarget } = this.props;
        let elementarray = this.state.item
        return connectDropTarget(
            <div>
                <JointjsDemo elements={elementarray} />
                {/* <Stage width={window.innerWidth - 256} height={window.innerHeight - 48}>
                    <Layer>{  elements }</Layer>
                </Stage> */}
            </div>
        );
    }
}

export default DropTarget(Types.ELEMENT, elementTarget, collect)(DropContainer);