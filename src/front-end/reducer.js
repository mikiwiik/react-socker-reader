import { List, Map, fromJS } from 'immutable';

import * as actions from './actions';

const defaultState = Map({
    messages: List(),
});

export default function reducer(state = defaultState, action) {
    if (!action) return state;

    switch (action.type) {
        case actions.MESSAGES_RECEIVED:
            return state.set('messages', fromJS(action.data));
        case actions.MESSAGE_ADDED:
            return state.update('messages', messages => messages.push(fromJS(action.data)));
        case actions.MESSAGE_UPDATED:
            const messageIndex = state.get('messages').findIndex(message =>
                message.get('id', '')  === action.data.id
            );
            return (messageIndex === -1)
                ? state
                : state.update('messages', messages =>
                    messages.set(messageIndex, fromJS(action.data))
                );
        default:
            return state;
    }
}
