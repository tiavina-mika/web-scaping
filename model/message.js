import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MessageSchema = new Schema(
    {
        messageId: { type: String },
        name: { type: String },
        forwardedTo: { type: String },
        time: { type: String },
        profilPic: { type: String },
        message: { type: String },
        message: {
            messageType: String,
            status: String,
            text: String,
            quotes: {
                name: String,
                email: String
            },
        },
        status: { type: String },
        country: { type: String },
        createdAt: { type: Date,default: Date.now },
        updatedAt: { type: Date },
    }
)

export default mongoose.model('Message', MessageSchema)
