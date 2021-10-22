import { Column, CreateDateColumn,Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator'


@Entity("products")
export class Product {

  @PrimaryColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  productname: string;

  @Column()
  @IsInt()
  @IsNotEmpty()
  price: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  type: string;

  @Column()
  categoriaId: string;


  @ManyToOne(() => Category, category => category.productos)
  @JoinColumn({ name: 'categoriaId'})
  
  categoria: Category;



  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}
