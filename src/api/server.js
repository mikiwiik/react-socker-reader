import restify from 'restify';

import messages from './messages.js';

const server = restify.createServer();
server.get('/messages', (req, res, next) => {
    res.json(messages.get());
    next();
});

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});