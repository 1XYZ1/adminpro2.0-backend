const Usuario = require('../models/usuarios');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const actualizarUsuario = async(req, res = response) => {
    const uid = req.params.id

    try {
        const usuarioDB = await Usuario.findById(uid)
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            })
        }

        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email })
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    message: 'Email no disponible'
                })
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Error inesperado, revisar logs'
        })
    }
}

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'name email google role ');
    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}
const createUser = async(req, res = response) => {
    const { name, email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email })
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                message: "Correo ya existente"
            })

        }
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar el token de  acceso - JWT
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado, revisar logs'
        })
    }

}

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id

    try {
        const usuarioDB = await Usuario.findById(uid)
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            })
        }

        await Usuario.findByIdAndDelete(uid);


        res.status(200).json({
            ok: true,
            msg: "Usuario eliminado",
            uid
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
    // res.status(200).json({
    //     ok: true,
    //     uid
    // });
}


module.exports = { getUsuarios, createUser, actualizarUsuario, borrarUsuario }