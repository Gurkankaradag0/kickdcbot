const Mongoose = require('mongoose')

const SettingsSchema = new Mongoose.Schema(
    {
        gid: {
            type: String,
            unique: true
        },
        rid: {
            type: String,
            unique: true
        },
        streamRoom: {
            type: String,
            default: ''
        },
        streamRoomContent: {
            type: String,
            default: ''
        },
        lastStream: {
            type: String,
            default: ''
        }
    },
    { timestamps: true, versionKey: false }
)

module.exports = Mongoose.model('Settings', SettingsSchema)
