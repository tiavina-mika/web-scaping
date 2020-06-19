import mongoose from 'mongoose'
import { scrapConversations } from './scrap/conversations'

// const dbUrl = 'mongodb+srv://admin:flibagoumo0@cluster0-y6yfn.gcp.mongodb.net/test?readPreference=primary&ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
const dbUrl = 'mongodb://admin:flibagouMO0@cluster0-shard-00-00-y6yfn.gcp.mongodb.net:27017,cluster0-shard-00-01-y6yfn.gcp.mongodb.net:27017,cluster0-shard-00-02-y6yfn.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
// const dbUrl = 'mongodb://localhost/demo_scraping'
const run = async () => {
    try {
        await mongoose.connect(dbUrl, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('MongoDB connected...')
        // const connection = await mongoose.connection.dropDatabase()
        // if (connection) console.log('Database deleted');

        await scrapConversations()

    } catch (error) {
        console.log('database error', error)
    }
}
run()