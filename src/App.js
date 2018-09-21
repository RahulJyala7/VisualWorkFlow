import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import data from './data/sidepanel.json';
import DragElement from './components/DragElement';
import DropContainer from './components/DropContainer';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sideItems: [],
            accordionIdx: null,
            isActive: false
        }
    }

    componentDidMount = () => {
        this.setState({sideItems: data.data});
    }

    handleAccordion = (index) => {
        this.setState({
            accordionIdx: index,
            isActive: !this.state.isActive
        });
    }

    render() {
        const {sideItems, accordionIdx, isActive} = this.state;
        let accordionData = sideItems.map((s, i) => <div key={i} className="accordion">
            <div className="accordionHeader" onClick={() => this.handleAccordion(i)}>{s.name}</div>
            <div
                className={accordionIdx === i && isActive
                ? "accordionPanel isActive"
                : "accordionPanel"}>
                {s
                    .data
                    .map((d, i) =>  <DragElement key={i} data={d}/>)}
            </div>
        </div>);
        return (
            <div className="app">
                <header className="header">
                    <div className="brand"></div>
                </header>
                <main>
                    <aside className="sidePanel">
                        <input
                            type="text"
                            className="textbox panelSearch"
                            placeholder="Search Here..."/>
                        <div className="itemContainer">{accordionData}</div>
                    </aside>
                    <DropContainer />
                </main>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);
