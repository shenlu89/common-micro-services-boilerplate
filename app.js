import Koa from 'koa'
import views from 'koa-views'
import koaBody from 'koa-body'
import logger from 'koa-morgan'
import jwt from 'koa-jwt'
import path from 'path'
import koaStatic from 'koa-static'

// import cors from '@koa/cors'
// import helmet from 'koa-helmet'
// import compress from 'koa-compress'
// import { Z_SYNC_FLUSH } from 'zlib'
// import staticCache from 'koa-static-cache'

// extend common micro services
import index from './routes/index'
import users from './routes/users'
import errorHandler from './services/utils/errorHandler'
import './models/db'

// init Koa
const app = new Koa()

// trust proxy
app.proxy = true

// routes error-handling
app.use(errorHandler)

// compress http response
// app.use(compress({
//   threshold: 2048,
//   flush: Z_SYNC_FLUSH
// }))

// Access-Control-Allow-Origin:'*' (ENV_DEV)
// app.use(cors('*'))

// security with HTTP headers
// app.use(helmet())

// middlewares
app.use(koaBody({
  multipart: true, // support file upload
  formidable: {
    uploadDir: path.join(__dirname, process.env.UPLOAD_FILE_DIR), // set directory of uploading file
    keepExtensions: true,    // keep the extension of uploading file
    hash: 'md5'
  }
}));

// logger (ENV_DEV)
app.use(logger('dev'))

// app.use(staticCache(path.join(__dirname, 'public'), { maxAge: 7 * 24 * 60 * 60 }))

// app.use(staticCache(path.join(__dirname, 'views'), { maxAge: 7 * 24 * 60 * 60 }))

app.use(views(path.join(__dirname, 'views'), { extension: 'html' }))

app.use(koaStatic(path.join(__dirname, 'public')))

app.use(koaStatic(path.join(__dirname, 'views')))

// routes
app.use(index.routes(), index.allowedMethods())

// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: process.env.JWT_SECRET }))

// users routes
app.use(users.routes(), users.allowedMethods())

module.exports = app