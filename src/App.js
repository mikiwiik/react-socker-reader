import React, {Component} from 'react';
import io from 'socket.io-client';

import './App.css';

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
            .on('disconnect', () => {
                //console.log('DISCONNECT');
            });
        this.socket.emit('get-messages');
    }

    renderMessages() {
        return this.state.messages.map(message =>
            <li key={message.id}>{message.message}</li>
        )
    }

    render() {
        return <div className={App}>
            <ul>
                {this.renderMessages()}
                <button onClick={() => this.socket.emit('add-message')}>add message</button>
            </ul>
        </div>;
    }
}

export default App;
