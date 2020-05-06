import mongoose from '../db'

const logSchema = new mongoose.Schema({
    level: { type: String },
    message: { type: String },
    info: {
        date: Date,
        method: String,
        ip: String,
        url: String,
        costTime: Number,
        body: String,
        response: {
            status: Number,
            message: String,
            header: String,
            body: String
        }
    }
}, {
    versionKey: false
})

export default mongoose.model('Logs', logSchema)