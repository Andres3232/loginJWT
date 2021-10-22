import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { UsuarioController } from "../controllers/usuarioController";

const routerCategory = Router();
const categoryController = new CategoryController()

routerCategory.get("/add-categoria", (request, response) => {
    response.render("add-categoria");
});

routerCategory.get("/lista-categoria",categoryController.listCategories)

routerCategory.post("/add-categoria",categoryController.createCategory)

routerCategory.get("/edit-categoria",categoryController.getCategoryData)
routerCategory.post("/edit-category",categoryController.updateCategory)

routerCategory.post("/delete-categoria",categoryController.deleteCategory)


export { routerCategory };
