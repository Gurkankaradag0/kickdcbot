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
        }
    },
    { timestamps: true, versionKey: false }
)

module.exports = Mongoose.model('Settings', SettingsSchema)
