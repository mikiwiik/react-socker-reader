import io from 'socket.io-client';

export const GET_MESSAGES = 'GET_MESSAGES';
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const MESSAGE_ADDED = 'MESSAGE_ADDED';

export const TOGGLE_MESSAGE = 'TOGGLE_MESSAGE';
export const MESSAGE_TOGGLED = 'MESSAGE_TOGGLED';

export function getActions(dispatch) {
    const socket = io('http://localhost:8080')
        .on('connect', () =>
            console.log('Connect')
        )
        .on('messages', (messages) =>
            dispatch({
                type: MESSAGES_RECEIVED,
                data: messages
            })
        )
        .on('message-added', (message) =>
            dispatch({
                type: MESSAGE_ADDED,
                data: message
            })
        )
        .on('message-toggled', (message) =>
            dispatch({
                type: MESSAGE_TOGGLED,
                data: message
            })
        )
        .on('disconnect', () =>
            console.log('Disconnect')
        );
    return {
        getMessages() {
            dispatch({
                type: GET_MESSAGES,
            });
            socket.emit('get-messages');
        },
        addMessage() {
            dispatch({
                type: ADD_MESSAGE,
            });
            socket.emit('add-message');
        },
        toggleMessage(messageId) {
            dispatch({
                type: TOGGLE_MESSAGE,
                data: messageId,
            });
            socket.emit('toggle-message', messageId);
        },
    }
}