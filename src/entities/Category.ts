import {Column, OneToMany,CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";
import { IsString } from "class-validator";


@Entity('categories')

export class Category {
  
  @PrimaryColumn()
  id:string;
  
  @Column()
  @IsString()
  name: string;
  
  @OneToMany(() => Product, product => product.categoria)
  productos: Product[];


  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}