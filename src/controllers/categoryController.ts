import { Request, Response } from "express";

import { categoryService } from "../services/categoryService"

class CategoryController {

    //controlar al listar categorias
    async listCategories(request: Request, response: Response) {
        
      const category = await categoryService.listCategory();
    
      return response.render('lista-categoria',{category})
    }

      //controlar la asignación de categoría
      async createCategory(request: Request, response: Response) {
        const { name} = request.body;
    
        try {
          await categoryService .createCategory({
            name
          }).then(() => {
            response.render("messageCategoria", {
              message: "Categoría Creada"
            });
          });
        } catch (err) {
          response.render("messageCategoria", {
            message: `Error al asignar la categoría: ${err.message}`
          });
        }
      }

      //controlar la búsqueda de categoría
      async searchCategory(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        try {
          const categories = await categoryService.searchCategory(search);
          response.render("search", {
            categories: categories,
            search: search
          });
        } catch (err) {
          response.render("message", {
            message: `Error al buscar categoría: ${err.message}`
          });
        }
      }

      //controlar la data de la categoría
      async getCategoryData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        console.log(id);
        
        //@ts-ignore
        const category = await categoryService.getDataCategory(id);
       
        console.log('controller',category);
        
        return response.render("edit-categoria", {
          category,
        });
      }

      //controlar la edición de la categoria
      async updateCategory(request: Request, response: Response) {
        const { name } = request.body;
    
        try {
          await categoryService.updateCategory({name}).then(() => {
            response.render("messageCategoria", {
              message: "Categoría Actualizada"
            });``
          });
        } catch (err) {
          response.render("messageCategoria", {
            message: `Error al actualizar la categoría: ${err.message}`
          });
        }
    
      }

      //controlar la eliminación de categoría
      async deleteCategory(request: Request, response: Response) {
        const { id } = request.body;
    
        try {
          await categoryService.deleteCategory(id).then(() => {
            response.render("messageCategoria", {
              message: "Categoría Eliminada"
            });
          });
        } catch (err) {
          response.render("messageCategoria", {
            message: `Error al eliminar la categoría: ${err.message}`
          });
        }
      }
};
export {CategoryController}