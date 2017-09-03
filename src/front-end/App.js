import React, {Component} from 'react';
import io from 'socket.io-client';

import './App.css';
import Message from './Message';

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
            <Message id={message.id}
                     message={message.message}
                     updated={message.updated}
                     onClick={() => this.socket.emit('toggle-message', message.id)}/>
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
