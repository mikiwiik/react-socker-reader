import React, {Component} from 'react';
import './App.css';

class App extends Component {

    state = { messages: []};

    componentDidMount() {
        fetch('/messages')
            .then(response => response.json())
            .then(messages => {
                this.setState({messages: messages});
            })
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
            </ul>
        </div>;
    }
}

export default App;
