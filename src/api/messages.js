import faker from'faker';

export function getMessages(size = 10) {
    const messages = [];
    for (let i = 0; i < size; i++) {
        messages.push({id: i, message: faker.company.catchPhrase()})
    }
    return messages;
}