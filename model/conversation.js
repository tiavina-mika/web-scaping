import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ConversationSchema = new Schema(
    {
        name: { type: String },
        conversationId: { type: String },
        date: { type: String },
        client: { type: String },
        status: { type: String },
        messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
    }
)

export default mongoose.model('Conversation', ConversationSchema)