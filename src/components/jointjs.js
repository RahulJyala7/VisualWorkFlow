import React from 'react'
import ReactDOM from 'react-dom';
import joint, { connectors } from 'jointjs'
import $ from 'jquery'
import { V } from 'jointjs'
import _ from 'lodash'

export default class JointjsDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = { elements: [] }
        this.graph = new joint.dia.Graph;
    }

    componentWillReceiveProps() {
        this.setState({ elements: this.props.elements.concat(this.state.elements) })
    }

    componentDidUpdate() {
        var graph = new joint.dia.Graph;
        var paper = new joint.dia.Paper({
            el: ReactDOM.findDOMNode(this.refs.demo) , width: 1200, height: 600, model: graph, gridSize: 10,
            drawGrid: true,
        });

        graph.addCell([this.state.elements]);
    }

    componentDidMount() {
        var graph = new joint.dia.Graph;
        var paper = new joint.dia.Paper({
            el: ReactDOM.findDOMNode(this.refs.demo), width: 1200, height: 600, model: graph, gridSize: 10,
            drawGrid: true,
        });

        graph.addCell([this.state.elements]);
    }


    render() {
        return (
            <React.Fragment>
                <div id="demo" ref="demo" ></div>
            </React.Fragment>
        )
    }
}