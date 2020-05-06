import sendJSONresponse from './sendJSONresponse'
import { errLogger, resLogger } from '../logs'
import { formatError, formatRes } from '../utils/formatLog'
import log2db from '../logs/log2db'

// handle all the errors in routes
const errorHandle = async (ctx, next) => {
    let start = new Date()
    try {
        await next()
        let resTime = new Date() - start
        resLogger.info(formatRes(ctx, `${resTime}ms`)) // ENV_DEV
        log2db('RequestInfo', 'info', formatRes(ctx, resTime))
        switch (ctx.status) {
            case 404:
                console.info(ctx) // ENV_DEV
                await ctx.redirect('/')
                break
        }
    } catch (err) { // custom 401 handling
        let errTime = new Date() - start
        errLogger.error(formatError(ctx, err, `${errTime}ms`)) // ENV_DEV
        log2db('ErrorRequest', 'error', formatError(ctx, error, resTime))
        await sendJSONresponse(ctx, err.status, {
            "error": err.originalError ? err.originalError.message : err.message
        })
        console.error(err, ctx) // ENV_DEV
    }
}

export default errorHandle