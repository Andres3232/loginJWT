
import { UsersRepository } from "../repositories/UsersRepository";
import { getCustomRepository } from "typeorm";
import bcryptjs from 'bcryptjs'
import { generarJWT } from "../helpers/generJWT";
import { userService } from '../services/usuarioService';
import  { LocalStorage } from 'node-localstorage';



const localStorage = new LocalStorage('./scratch');


export const login = async(req, res,) => {

    const { username, password } = req.body;
  
    const usersRepository = getCustomRepository(UsersRepository);

    try {
      
        // Verificar si el email existe
        
        const usuario = await usersRepository.findOne({username})
        
        
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario  no es correcto o no existe '
            });
        }


        // Verificar la contraseña

          let passwordString = password.toString()
    
        
        const validPassword = bcryptjs.compareSync( passwordString, usuario.Password );
        
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token:any = await generarJWT( usuario.id );
        console.log(usuario,token);
       
        localStorage.setItem('x-token',JSON.stringify(token))


        //  let local = JSON.parse(localStorage.getItem('x-token'))
        // console.log(local);
        
        
        const users = await userService.list();
        
        
        //return res.json({usuario,token})
        return res.render("index", {
            usuario,
            token,
            users
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   
}