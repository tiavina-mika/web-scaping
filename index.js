import mongoose from 'mongoose'
import { scrapConversations } from './scrap/conversations'

const dbUrl = 'mongodb://localhost/demo_scraping'
const run = async () => {
    try {
        await mongoose.connect(dbUrl, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('MongoDB connected...')
        const connection = await mongoose.connection.dropDatabase()
        if (connection) console.log('Database deleted');

        await scrapConversations()

    } catch (error) {
        console.log('database error', error)
    }
}
run()