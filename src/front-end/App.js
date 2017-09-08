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
        return <div className={App}>
            <Messages
                messages={this.props.messages}
                addMessage={this.props.addMessage}
                toggleMessage={this.props.toggleMessage}
            />
        </div>
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages,
    }
}

function mapDispatchToProps(dispatch) {
    return getActions(dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
