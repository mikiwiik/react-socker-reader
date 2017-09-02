import faker from'faker';

const messages = [];

function createMessage(id) {
    return {id, message: faker.company.catchPhrase()};
}

for (let i = 0; i < 10; i++) {
    messages.push(createMessage(i));
}

export default {
    get() {
        return messages
    },
    add() {
        const message = createMessage(messages.length);
        messages.push(message);
        return message;
    },
    toggle(messageId) {
        const toggled = messages[messageId];
        toggled.message = toggled.message.split('').reverse().join('');
        messages[messageId] = toggled;
        return toggled;
    }
}