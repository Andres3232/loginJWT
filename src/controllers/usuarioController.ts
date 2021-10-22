
import { Request, Response } from "express";

import { userService } from "../services/usuarioService"
 import bcryptjs from 'bcryptjs'

class UsuarioController {
     
    //metodo para listar usuarios
    async listUsers(request: Request, response: Response) {
    
        const users = await userService.list();
    
        return response.render("index", {
          users
        });
      }

      //metodo para agregar usuario
      async createUser(request: Request, response: Response) {
        let { username, email, Telefono, Ciudad, Estado, Rol, Password } = request.body;
        Telefono = parseInt(Telefono)

        const salt = bcryptjs.genSaltSync();
        Password = bcryptjs.hashSync( Password, salt );
       
        try {
          await userService.create({
            username,
            email,
            Telefono,
            Ciudad,
            Estado,
            Rol,
            Password
          }).then(() => {
            
            response.render("message", {
              message: "Usuario creado con exito"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al crear el usuario: ${err.message}`
          });
        }
    
      }

      //metodo para buscar usuario
      async searchUser(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();

    
        try {
          const users = await userService.search(search);
          response.render("search", {
            users,
            search
          });
        } catch (err) {
          response.render("message", {
            message: `Error al buscar el usuario: ${err.message}`
          });
        }
      }

      //traer la data del usuario
      async getUserData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const user = await userService.getData(id);
    
        return response.render("edit", {
          user
        });
      }

      //editar el usuario
      async updateUser(request: Request, response: Response) {
        const { id, username, email, Telefono, Ciudad, Estado, Rol, Password } = request.body;
    
        try {
          await userService.update({ id, username, email, Telefono, Ciudad, Estado, Rol, Password}).then(() => {
            response.render("message", {
              message: "Usuario actualizado"
            });
          });

        } catch (err) {
          response.render("message", {
            message: `Error al actualizar el usuario: ${err.message}`
          });
        }
    
      }


      //borrar usuario
      async deleteUser(request: Request, response: Response) {
        const { id } = request.body;
        try {
          await userService.delete(id).then(() => {
            
            response.render("message", {message: "Usuario eliminado"}) 
          });
        } catch (err) {
          response.render("message", {
            message: `Error al eliminar el usuario: ${err.message}`
          });
        }
      }



    
}
export  { UsuarioController };
