import { DataTypes, Model, type Optional } from 'sequelize';
import sequelizeConnection  from '../../config/db.config'

interface CollectionAttributes {
    collection_id: string;
    name: string;
    owner_id: string;
  };

export interface CollectionInput extends Optional<CollectionAttributes, 'name'> {}

export interface CollectionOutput extends Required<CollectionAttributes> {}

class collection extends Model<CollectionAttributes, CollectionInput> implements CollectionAttributes {
    public collection_id!: string;
    public name!: string;
    public owner_id!: string;
}

collection.init(
  {
    collection_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:  true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
    },
    owner_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  }
);

export default collection;