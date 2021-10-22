import { getCustomRepository } from "typeorm";
import { Category } from "../entities/Category";
import { CategoryRepository } from "../repositories/CategoriesRepository";

interface ICategory{
    id?:string;
    name:string;
};

class CategoryService{

     //Método para listar categorias
     async listCategory() {
        const categoriesRepository = getCustomRepository(CategoryRepository);
    
        const category = await categoriesRepository.find();
    
        return category;
    };

    //Método para crear categoria
    async createCategory({ name }: ICategory) {
        if (!name) {
            throw new Error("Por favor complete el campo de categoría");
        }
    
        const categoriesRepository = getCustomRepository(CategoryRepository);
    
        const nameAlreadyExists = await categoriesRepository.findOne({ name });
    
        if (nameAlreadyExists) {
            throw new Error("La categoría ya está registrada.");
        }
    
        const category = categoriesRepository.create({ name });
    
        await categoriesRepository.save(category);
    
        return category;
    };

    //Método para buscar categoria
    async searchCategory(search: string) {
        if (!search) {
            throw new Error("Por favor complete el campo de búsqueda");
        }
    
        const categoriesRepository = getCustomRepository(CategoryRepository);
    
        const category = await categoriesRepository
            .createQueryBuilder()
            .where("name like :search", { search: `%${search}%` })
            .getMany();
    
        return category;
    };


    //Método para traer data categoria
    async getDataCategory(id: string) {
    
        const categoriesRepository = getCustomRepository(CategoryRepository);  

        const category = await categoriesRepository.findOne(id);
        console.log('servicio',id);
        
        return category;
    };

    //Método para actualizar categoria
    async updateCategory({name,id}: ICategory) {

      const categoriesRepository = getCustomRepository(CategoryRepository);
    
      const category = await categoriesRepository
        .createQueryBuilder()
        .update(Category)
        .set({ name })
        .where("id = :id", { id })
        .execute();
    
      return category;
    
    };
      
    //Método para borrar categoria
    async deleteCategory(id: string) {

       const categoriesRepository = getCustomRepository(CategoryRepository);
    
       const category = await categoriesRepository

        .createQueryBuilder()
        .delete()
        .from(Category)
        .where("id = :id", { id })
        .execute();
    
       return category;
    
    };
};

export const categoryService = new CategoryService()
export default {CategoryService}