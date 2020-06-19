import ConversationModel from '../model/conversation'
import MessageModel from '../model/message'

export const createConversation = async conversation => {
    try {
        const { name, id, date, client,status, messages } = conversation

        const existConversation = await getConversationByName(id)
        
        if (existConversation) {

            if (existConversation.dateLatest !== date.timezone) {
                for (const message of messages ) {
                    const existMessage = existConversation.messages.find(item => item.messageId !== message.messageId);
                    
                    if (existMessage) {
                        const newMessage = new MessageModel(message)
                        await newMessage.save()
                        existConversation.messages.push(newMessage);
                    }
                }
     
                existConversation.set('dateLatest', date.timezone);
                await existConversation.save();

            }
        } else {
            const insertMessages = []

            for (const message of messages ) {
                const newMessage = new MessageModel(message)
                await newMessage.save()
    
                insertMessages.push(newMessage)
            }
            const saveConversation = new ConversationModel({
                name,
                conversationId: id,
                date,
                dateLatest: date.timezone,
                client,
                status,
                messages: [...insertMessages]
            })

            await saveConversation.save()
        }

    } catch (error) {
        console.log('save conversation error', error)
    }
}

export const getConversation = async id => {
    try {
        const conversation = await ConversationModel.findById(id).populate('messages').exec()
        return conversation
    } catch (error) {
        console.log('getConversation error: ', error)
    }
}

export const getConversationByName = async (conversationId) => {
    try {
        const conversation = await ConversationModel.findOne({ conversationId }).populate('messages').exec()

        return conversation
    } catch (error) {
        console.log('getConversation error: ', error)
    }
}

export const getConversations = async () => {
    try {
        const conversations = await ConversationModel.find().populate('messages').exec()
        return conversations
    } catch (error) {
        console.log('getConversations error: ', error)
    }
}