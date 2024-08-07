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

const updateLastStream = (liveStreamCreatedAt) => {
    return Settings.findOneAndUpdate({}, { lastStream: liveStreamCreatedAt })
}

const updateStreamRoom = (streamRoom, streamRoomContent) => {
    return Settings.findOneAndUpdate({}, { streamRoom, streamRoomContent })
}

module.exports = { getSettings, createSettings, updateLastStream, updateStreamRoom }
