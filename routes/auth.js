const { Router } = require ('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, validarUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Crear un nuevo usuario
router.post('/register',[ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 8}),
    validarCampos
    ], crearUsuario);

// Login de usuario
router.post('/',[ 
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 8}),
    validarCampos
    ], loginUsuario);

// Validar y revalidar token
router.get('/reregister', validarUsuario);



module.exports = router;