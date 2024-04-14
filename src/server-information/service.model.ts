import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ServiceCreateAttr{
    name: string
    show: boolean
}

@Table({tableName:"services"})
export class Service extends Model<Service, ServiceCreateAttr>{
    @Column({type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string
}
