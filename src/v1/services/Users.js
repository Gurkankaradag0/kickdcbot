const User = require('../models/Users')

const isExists = (params) => {
    return User.exists(params)
}

const getUsers = () => {
    return User.find()
}

const insert = (userData) => {
    const user = new User({
        discordId: userData.discordId,
        kickId: userData.sender.id,
        kickSlug: userData.sender.slug
    })
    return user.save()
}

module.exports = { isExists, getUsers, insert }
