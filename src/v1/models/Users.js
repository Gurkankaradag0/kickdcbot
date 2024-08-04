const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema(
    {
        discordId: {
            type: String,
            unique: true
        },
        kickId: {
            type: Number,
            unique: true
        },
        kickSlug: {
            type: String,
            unique: true
        }
    },
    { timestamps: true, versionKey: false }
)

module.exports = Mongoose.model('User', UserSchema)
