const { response } = require('express');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        // Verificar Email
        const usuarioDB = await Usuario.findOne({ email })

        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: "Email invalido"
            })

        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)

        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            })

        }

        // Generar el token de  acceso - JWT
        const token = await generarJWT(usuarioDB.id)


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "hable con el admin"
        })

    }
}

module.exports = { loginUsuario };