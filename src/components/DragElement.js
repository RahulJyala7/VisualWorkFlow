import React, {Component} from 'react';
import {DragSource} from 'react-dnd';

const Types = {
    ELEMENT: 'element'
};

const elementSource = {
    beginDrag(props, monitor) {
        const {name, id, type} = props.data;
        return {name, id, type};
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class DragElement extends Component {

    render() {
        const {connectDragSource, data} = this.props;
        const {id, position, type, name} = data;
        return connectDragSource(
            <div className="dragItem">
                <i className=""></i>
                <label className="dragText">{name}</label>
            </div>
        );
    }
}

export default DragSource(Types.ELEMENT, elementSource, collect)(DragElement);