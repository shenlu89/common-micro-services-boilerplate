import log4js from 'log4js'
import path from 'path'

// Config log4js
log4js.configure({
    appenders: {
        error: {
            type: 'dateFile',
            category: 'errLogger',
            filename: path.join(__dirname, '..', '..', 'logs', 'errors', 'error'), 
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        response: {
            type: 'dateFile',
            category: 'resLogger',
            filename: path.join(__dirname, '..', '..', 'logs', 'responses', 'response'),
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        error: {
            appenders: ['error'],
            level: 'error'
        },
        response: {
            appenders: ['response'],
            level: 'info'
        },
        default: {
            appenders: ['response'],
            level: 'info'
        }
    },
    replaceConsole: false
})

const errLogger = log4js.getLogger('error')
const resLogger = log4js.getLogger('response')

export { errLogger, resLogger }