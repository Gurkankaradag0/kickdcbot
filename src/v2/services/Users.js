const User = require('../models/Users')

const isExists = (params) => {
    return User.exists(params)
}

const getUser = (discordId) => {
    return User.findOne({ discordId })
}

const getUsers = () => {
    return User.find()
}

const insertUser = (userData) => {
    const user = new User({
        discordId: userData.discordId,
        kickId: userData.sender.id,
        kickSlug: userData.sender.slug
    })
    return user.save()
}

const updateUser = (userData) => {
    return User.findOneAndUpdate(
        { discordId: userData.discordId },
        {
            kickId: userData.sender.id,
            kickSlug: userData.sender.slug
        }
    )
}

module.exports = { isExists, getUser, getUsers, insertUser, updateUser }
