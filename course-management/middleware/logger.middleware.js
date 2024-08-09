const morgan = require('morgan');

const logger = morgan((tokens, req, res) => {
    return [
        tokens.method(req,res),
        tokens.url(req,res),
        tokens.status(req,res),
        tokens['response-time'](req,res), 'ms',
        new Date().toLocaleDateString()
    ].join(' ');
});

module.exports = logger