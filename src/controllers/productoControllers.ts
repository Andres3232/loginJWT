
import { Request, Response } from "express";

import { productService } from "../services/productService";

import { categoryService } from '../services/categoryService';




class ProductController {
     
    //metodo para listar usuarios
    async listProducts(request: Request, response: Response) {
    
        const products = await productService.list();
        return response.render('lista-producto',
          {products
        })
      }


      //metodo para agregar usuario
      async createProduct(request: Request, response: Response) {
        let { productname, price, type, name } = request.body;
        price = parseInt(price)
      
        
        
        try {
          await productService.create({
            
            productname,
            price,
            type,
            name
          }).then(() => {
            
            response.render("messageProducto", {
              message: "Producto creado con éxito",
            });
          });
        } catch (err) {
          
          response.render("messageProducto", {
            message: `Error al crear el producto: ${err.message}`
          });
        }
    
      }

      //metodo para listar las cateegorias al momento de crear un producto

      async searchCategory(request: Request,response: Response){
        const category = await categoryService.listCategory();
    
        return response.render('add-producto',{category})
      }

      //metodo para buscar Product
      async searchProduct(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();

    
        try {
          const products = await productService.search(search);
          response.render("search", {
            products,
            search
          });
        } catch (err) {
          response.render("message", {
            message: `Error al buscar el usuario: ${err.message}`
          });
        }
      }

      //traer la data del producto
      async getProductData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
        
        const product = await productService.getData(id);
        return response.render("edit-producto", {
          product
        });
      }

      //editar el producto
      async updateProduct(request: Request, response: Response) {
        const { id, productname, price, type, categoriaId } = request.body;

    
        try {
          await productService.update({ id, productname, price, type, categoriaId }).then(() => {
            response.render("messageProducto", {
              message: "producto actualizado"
            });
          });

        } catch (err) {
          response.render("messageProducto", {
            message: `Error al actualizar el producto: ${err.message}`
          });
        }
    
      }

      //borrar product
      async deleteProduct(request: Request, response: Response) {
        const { id } = request.body;
        try {
          await productService.delete(id).then(() => {
            response.render("messageProducto", {message: "Producto eliminado"}) 
          });
        } catch (err) {
          response.render("messageProducto", {
            message: `Error al eliminar el producto: ${err.message}`
          });
        }
      }
}
export  { ProductController };
