import ConversationModel from '../model/conversation'
import MessageModel from '../model/message'

export const createConversation = async conversation => {
    try {
        const { name, id, date, client,status, messages } = conversation
        const dataMessages = []

        for (const message of messages ) {
            // const {
            //     name: messageName,
            //     forwardedTo,
            //     time,
            //     profilPic,
            //     message,
            //     status: messageStatus,
            //     country 
            // } = m

            dataMessages.push(new MessageModel(message))
        }
        const newConversation = new ConversationModel({
            name,
            conversationId: id,
            date,
            client,
            status,
            messages: [...dataMessages]
        })
        const result = await newConversation.save()
        return result
    } catch (error) {
        console.log('save conversation error', error)
    }
}