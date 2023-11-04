const rateLimit = require('express-rate-limit')
const { logEvents } = require('./logger')

const loginLimiter = rateLimit({
    windowsMs: 60 * 10000, // 1 minute
    max: 5,
    message:
    { message: 'Too many login attempts from this IP, please try again after a 60 secod pause' },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.message.message}/t${req.method}/t${req.url}/t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the 'RateLimit' headers
    legacyHeaders: false, // disable the 'X-RateLimit' headers
})

module.exports = loginLimiter