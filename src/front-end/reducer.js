import * as actions from './actions';

const defaultState = {
    messages: [],
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case actions.MESSAGES_RECEIVED:
            return { ...state, messages: action.data };
        case actions.MESSAGE_ADDED:
            return { ...state, messages: [...state.messages, action.data] };
        case actions.MESSAGE_TOGGLED:
            const messages = [...state.messages];
            messages[action.data.id] = action.data;
            return { ...state, messages };
        default:
            return state;
    }
}
