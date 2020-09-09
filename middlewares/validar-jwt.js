const { json } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    // Leer token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Se necesita un token'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)

        req.uid = uid

        next()

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token Invalido',
            error
        })
    }



}

module.exports = { validarJWT };