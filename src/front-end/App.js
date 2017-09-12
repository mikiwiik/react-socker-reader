import React, {Component} from 'react';
import io from 'socket.io-client';

import './App.css';
import Messages from './Messages';

class App extends Component {

    state = {messages: []};
    socket = io('http://localhost:8080');

    componentDidMount() {
        this.socket
            .on('connect', () => {
                //console.log('CONNECT');
            })
            .on('messages', (messages) => {
                this.setState({messages: messages});
            })
            .on('message-added', (message) => {
                this.setState({messages: [...this.state.messages, message]});
            })
            .on('message-updated', (message) => {
                const messages = [...this.state.messages];
                messages[message.id] = message;
                this.setState({messages: messages});
            })
            .on('disconnect', () => {
                //console.log('DISCONNECT');
            });
        this.socket.emit('get-messages');
    }

    toggleMessage  = (messageId) => {
        this.socket.emit('toggle-message', messageId)
    };

    render() {
        return <div className="App">
            <div className="App-gutter"/>
            <div className="App-mainView">
                <div className="App-topButtons" >
                    <button onClick={() => this.socket.emit('add-message')}>Add message</button>
                </div>
                <Messages messages={this.state.messages}
                          toggleMessage={this.toggleMessage} />
            </div>
            <div className="App-gutter"/>
        </div>;
    }
}

export default App;
