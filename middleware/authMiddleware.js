const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if(!authHeader) return res.status(404).send({auth: false, message: 'No token'})

    const token = authHeader.split(' ')[1]

    if(!token) return res.status(404).send({auth: false, message: 'Malformed token'})

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if(err) return res.status(500).send({auth: false, message: 'Failed to authorization token'})

        req.userId = decoded.id
        // console.log(next)
        next()
        // console.log(next)
    })

    
}