/**
 * Route: '/api/auth
 */

const { Router } = require('express');
const router = Router();
const { loginUsuario } = require('../controllers/login');



router.post('/', [], loginUsuario)





module.exports = router;