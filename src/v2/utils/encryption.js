const crypto = require('crypto')

const algorithm = 'aes-128-cbc'
const secretKey = process.env.SECRET_KEY
const iv = crypto.randomBytes(16)

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv)
    let encrypted = cipher.update(text, 'utf8', 'base64')
    encrypted += cipher.final('base64')

    return encrypted
}

const decrypt = (encryptedText) => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv)
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
}

module.exports = { encrypt, decrypt }
