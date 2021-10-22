import { Router } from 'express';
import { ProductController } from '../controllers/productoControllers';





const routerProduct = Router();


const productoController = new ProductController()

routerProduct.get("/add-producto", productoController.searchCategory);


routerProduct.get("/lista-producto", productoController.listProducts)

routerProduct.post("/add-producto",productoController.createProduct)


routerProduct.get("/edit-producto",productoController.getProductData)
routerProduct.post("/edit-product",productoController.updateProduct)

routerProduct.post("/delete-producto",productoController.deleteProduct)

export { routerProduct };
  