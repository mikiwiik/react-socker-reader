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
            .on('message-toggled', (message) => {
                const messages = [...this.state.messages];
                messages[message.id] = message;
                this.setState({messages: messages});
            })
            .on('disconnect', () => {
                //console.log('DISCONNECT');
            });
        this.socket.emit('get-messages');
    }

    renderMessages() {
        return this.state.messages.map(message =>
            <li key={message.id}>
                <span className={(message.updated) ? 'App-message-updated' : 'App-message'}>{message.message}</span>
                <button onClick={() => this.socket.emit('toggle-message', message.id)}>Update</button>
            </li>
        )
    }

    render() {
        return <div className={App}>
            <ul>
                <button onClick={() => this.socket.emit('add-message')}>Add message</button>
                {this.renderMessages()}
            </ul>
        </div>;
    }
}

export default App;
