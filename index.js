import mongoose from 'mongoose'
import { scrapConversations } from './scrap/conversations'
import { createConversation } from './controller/conversation'

const dbUrl = 'mongodb://localhost/demo_scraping'
const run = async () => {
    try {
        await mongoose.connect(dbUrl, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('MongoDB connected...')
        const conversations = await scrapConversations()
        conversations.forEach(async (conversation, i) => {
            const savedConversation = await createConversation(conversation)
            console.log(`saved conversation [${i}]: ${savedConversation}`) 
        })


    } catch (error) {
        console.log('database error', error)
    }
}
run()