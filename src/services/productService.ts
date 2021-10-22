import { getCustomRepository } from "typeorm";

import { Product } from "../entities/Product";
import { Category } from "../entities/Category";
import { validate } from 'class-validator'

import {ProductsRepository} from "../repositories/ProductsRepository";
import {CategoryRepository} from "../repositories/CategoriesRepository";


interface IProduct{
  
    id?: string;
    productname: string;
    price: number;
    type: string;
    categoriaId: string;
    
}


class ProductService {

  //listar productos
    async list() {
        const productsRepository = getCustomRepository(ProductsRepository);

        const products = await productsRepository.find();
      
        return products;
      }

  //crear producto
  async create({ productname, price, type,name}) {
    // if (!productname || !price || !type ||!name) {
    //   throw new Error("Por favor escribe todo los campos");
    // }

    const productsRepository = getCustomRepository(ProductsRepository);

    const productnameAlreadyExists = await productsRepository.findOne({ productname });

    if (productnameAlreadyExists) {
      throw new Error("Producto ya esta registrado");
      

    }
    const categoryRepository = getCustomRepository(CategoryRepository);
    
    const categoria = await categoryRepository.findOne({name})
    if (!categoria) {
      throw new Error("No existe esa categoria");
    }
    
    
    const newProduct = new Product()
   
    newProduct.productname = productname
    newProduct.price = price
    newProduct.type=type
    //@ts-ignore
    newProduct.categoriaId=categoria.name
    //newProduct.categoria= categoria.name
  
    const errors = await validate(newProduct)
   console.log(errors);
   
    if (errors.length===0) {
      await productsRepository.save(newProduct);
  
      return newProduct;
      
    }else{
        //@ts-ignore
      throw new Error( errors);

    }
  }

  //buscar producto
      async search(search: string) {
        if (!search) {
          throw new Error("Por favor complete el campo de busca");
        }
    
        const productsRepository = getCustomRepository(ProductsRepository);
    
        
        const product = await productsRepository
          .createQueryBuilder()
          .where("productname like :search", { search: `%${search}%` })
          .orWhere("price like :search", { search: `%${search}%` })
          .orWhere(" type :search", { search: `%${search}%` })
          .orWhere(" categoriaId :search", { search: `%${search}%` })
          .getMany();
    
        return product;
    
      }


  //traer data del producto
      async getData(id: string) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository.findOne(id);
    
        return product;
      }

      async update({ id, productname, price, type,categoriaId  }: IProduct) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository
          .createQueryBuilder()
          .update(Product)
          .set({ productname, price, type ,categoriaId})
          .where("id = :id", { id })
          .execute();
    
        return product;
    
      }


      //delete
      async delete(id: string) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository
          .createQueryBuilder()
          .delete()
          .from(Product)
          .where("id = :id", { id })
          .execute();
    
        return product;
    
      }

}

export const productService = new ProductService()
export default { ProductService };
