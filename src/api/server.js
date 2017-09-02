import restify from 'restify';

import { getMessages } from './messages.js';

const server = restify.createServer();
server.get('/messages', (req, res, next) => {
    res.json(getMessages());
    next();
});

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});