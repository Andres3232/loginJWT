import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { IsAlphanumeric, IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator'


@Entity("users")
class User {

  @PrimaryColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsInt()
  Telefono: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  Ciudad: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  Estado: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  Rol: string;

  @Column()
  @IsNotEmpty()
  Password: string;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { User };