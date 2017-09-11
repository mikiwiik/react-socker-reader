import React, {Component} from 'react';
import { connect } from 'react-redux';

import './App.css';
import { getActions } from './actions';
import Messages from './Messages';

class App extends Component {
    componentWillMount() {
        this.props.getMessages();
    }

    render() {
        return <div className="App">
            <div className="App-gutter"/>
            <div className="App-mainView">
                <div className="App-topButtons" >
                    <button onClick={this.props.addMessage}>Add message</button>
                </div>
                <Messages messages={this.props.messages}
                          addMessage={this.props.addMessage}
                          toggleMessage={this.props.toggleMessage} />
            </div>
            <div className="App-gutter"/>
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        messages: state.get('messages').toJS(),
    }
}

function mapDispatchToProps(dispatch) {
    return getActions(dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
