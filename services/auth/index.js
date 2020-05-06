import User from '../../models/schema/users'
import sendJSONresponse from '../utils/sendJSONresponse'
import emailSender from '../emails'

const register = async(ctx) => {
    let { name, email: username, password } = ctx.request.body
    try {
        let user = await User.findOne({ email: username }).exec()
        if (!user) {
            user = new User()
            user.name = name
            user.email = username
            user.setPassword(password)
            user.newSessionDate()
            await user.save()
            await emailSender(username, content)
            sendJSONresponse(ctx, 200, {
                "token": user.generateJwt(7 * 24 * 60 * 60) // generate a json web token
            })
        } else {
            sendJSONresponse(ctx, 401, {
                message: 'The user has already existed, you can login.'
            })
        }
    } catch (err) {
        sendJSONresponse(ctx, 404, err)
    }
}

const login = async(ctx) => {
    let { email: username, password } = ctx.request.body
    try {
        let user = await User.findOne({ email: username }).exec()
        if (!user) {
            sendJSONresponse(ctx, 401, {
                message: 'Incorrect username.'
            })
        } else if (!user.validPassword(password)) {
            sendJSONresponse(ctx, 401, {
                message: 'Incorrect password.'
            })
        } else {
            sendJSONresponse(ctx, 200, {
                "token": user.generateJwt(7 * 24 * 60 * 60)
            })
        }
    } catch (err) {
        sendJSONresponse(ctx, 404, err)
    }
}

export { login, register }