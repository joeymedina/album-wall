import { DataTypes, Model, type Optional } from 'sequelize';
import sequelizeConnection  from '../../config/db.config'

interface UserAttributes {
    user_id: string;
    name: string;
    email: string;
    password: string;
    // createdAt?: Date;
    // updatedAt?: Date;
    // deletedAt?: Date;
  };

export interface UserInput extends Optional<UserAttributes, 'password'> {}
export interface UserOutput extends Required<UserAttributes> {}
class user extends Model<UserAttributes, UserInput> implements UserAttributes {
    public user_id!: string
    public name!: string
    public email!: string
    public password!: string
  
    // timestamps!
    // public readonly createdAt!: Date;
    // public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
  }

user.init(
  {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
    // Model attributes are defined here
    name: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
      // allowNull defaults to true
    },
    password: {
        type: DataTypes.TEXT,
        // allowNull defaults to true
      },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  }
);

export default user;