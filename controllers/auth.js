const { response } = require ('express');
const User = require('../models/User');
const bcrypt = require ('bcryptjs');
const { generarJWT } = require ('../helpers/jwt');




const crearUsuario = async (req, res = response ) => {

    const { email, name, password } = req.body;

    try {

        // Verificar el email
        const user = await User.findOne({ email })

        if(user) {
            res.status(400).json({
                ok: false,
                msg:'Ya existe un usuario con ese email'
            });
        }

        // Crear usuario con el modelo
        const dbUser = new User(req.body);

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        // Generar el JWT
        const token = await generarJWT(dbUser.id, name)

        // Crear usuario en db
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name, 
            token
        });
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Algo salió mal y el usuario no pudo ser creado'
        });
    }

    
    
    
}

const loginUsuario = async (req, res = response) => {



    const { email, password } = req.body;
    
    try {

        const dbUser = await User.findOne({email});

        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña incorrectos'
            });
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña incorrectos'
            });
        }

        // Generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name, 
            token
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error'
        })
        
    }


   
}

const validarUsuario = (req, res) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg:'error en el token'
        })
    }


    return res.json({
        ok: true,
        msg: 'validación',
        token
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    validarUsuario
}