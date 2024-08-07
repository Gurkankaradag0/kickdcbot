const Mongoose = require('mongoose')

const db = Mongoose.connection

db.once('open', () => {
    console.log('DB connection succes')
})

const connectDB = async () => {
    await Mongoose.connect(process.env.MONGODB_URI)
}

module.exports = {
    connectDB
}
