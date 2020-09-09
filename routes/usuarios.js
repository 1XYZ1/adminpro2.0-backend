/**
 * Route: '/api/usuarios
 */

const { Router } = require('express');
const { getUsuarios, createUser, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/', validarJWT, getUsuarios)
router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    createUser)

router.put('/:id', [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario)
router.delete('/:id', validarJWT, borrarUsuario)


module.exports = router;