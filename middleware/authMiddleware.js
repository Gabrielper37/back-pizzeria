const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if(!authHeader) return res.status(404).send({auth: false, message: 'No hay token.'})

    const token = authHeader.split(' ')[1]

    if(!token) return res.status(404).send({auth: false, message: 'El token no se formo correctamente.'})

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if(err) return res.status(500).send({auth: false, message: 'Fallo al autorizar el codigo.'})

        req.userId = decoded.id
        // console.log(next)
        next()
        // console.log(next)
    })

    
}