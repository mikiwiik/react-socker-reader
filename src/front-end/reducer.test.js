import {List, Map, fromJS} from 'immutable';

import reducer from './reducer';
import * as actions from './actions';

function getReducer(state = undefined, action = undefined) {
    return reducer(state, action);
}

const first = {id: 'first', message: 'first message'};
const second = {id: 'second', message: 'second message'};

test('messages should initially be empty ', () => {
    expect(
        getReducer().get('messages')
    ).toEqual(
        fromJS([])
    );
});

test('setting messages on MESSAGES_RECEIVED', () => {
    function messagesReceived(messages) {
        return getReducer(
            undefined,
            {type: actions.MESSAGES_RECEIVED, data: messages}
        );
    }

    expect(
        messagesReceived([first, second]).get('messages')
    ).toEqual(
        fromJS([first, second])
    );
});

describe('adding messages', () => {
    const newMessage = {id: 'some', message: 'A new message'};

    function addMessage(previousMessages = []) {
        return getReducer(
            Map({messages: fromJS(previousMessages)}),
            {type: actions.MESSAGE_ADDED, data: newMessage}
        );
    }

    test('adding a new message to empty messages', () => {
        expect(
            addMessage().get('messages')
        ).toEqual(
            fromJS([newMessage])
        );
    });

    test('adding a message to existing messages should append the new message', () => {
        expect(
            addMessage([first, second]).get('messages')
        ).toEqual(
            fromJS([first, second, newMessage])
        );
    });
});

describe('message updating', () => {
    function updateMessage(messages = [], updated) {
        return getReducer(
            Map({messages: fromJS(messages)}),
            {type: actions.MESSAGE_UPDATED, data: updated}
        );
    }

    test('updating an existing message should replace the existing message', () => {
        const updatedFirst = {id: 'first', message: 'First has been updated'};
        expect(
            updateMessage([first, second], updatedFirst).get('messages')
        ).toEqual(
            fromJS([updatedFirst, second])
        );
    });

    test('updating a non-existing message should not modify state', () => {
        const nonExistingMessage = {id: 'not-found', message: 'Message should not be found'};
        expect(
            updateMessage([first, second], nonExistingMessage).get('messages')
        ).toEqual(
            fromJS([first, second])
        );
    });
});
