const { connectDB } = require('./db')
const { connectChatRoom } = require('./pusher')

module.exports = async () => {
    await connectDB()
    await connectChatRoom()
}
