const Settings = require('../models/Settings')

const getSettings = () => {
    return Settings.findOne()
}

const createSettings = (settingsData) => {
    const settings = new Settings({
        gid: settingsData.gid,
        rid: settingsData.rid
    })
    return settings.save()
}

module.exports = { getSettings, createSettings }
