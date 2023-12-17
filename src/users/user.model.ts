import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreateAttr{
    login: string
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreateAttr>{
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique:true, allowNull:false})

    login: string;

    @Column({type: DataType.STRING, allowNull:false})
    
    password: string;
    
    @Column({type: DataType.STRING, allowNull:false})
    status: string;
}