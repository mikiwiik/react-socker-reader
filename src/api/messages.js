import faker from'faker';

function createMessage(id) {
    return {
        id: id.toString(),
        message: faker.company.catchPhrase(),
        updated: false,
    };
}

const messages = [];
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
        toggled.updated = !toggled.updated;
        messages[messageId] = toggled;
        return toggled;
    }
}