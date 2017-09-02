import http from 'http';
import socketio from 'socket.io';

import messages from './messages.js';

const server = http.createServer();
const io = socketio(server);
io.on('connection', (client) => {
    client.on('get-messages', () => {
        io.emit('messages', messages.get());
    });

    client.on('add-message', () => {
        io.emit('message-added', messages.add());
    });

    client.on('disconnect', () => {
        console.log('disconnect')
    });
});

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});