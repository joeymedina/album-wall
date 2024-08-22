import { DataTypes, Model, type Optional } from 'sequelize';
import sequelizeConnection  from '../../config/db.config'

interface AlbumAttributes {
    album_id: string;
    name: string;
    artist: string
    artwork_url: string;
    spotify_uri: string;
    collection_id: string;
    user_id: string;
  };

export interface AlbumInput extends Optional<AlbumAttributes, 'name' | 'artist' > {}

export interface AlbumOutput extends Required<AlbumAttributes> {}

class album extends Model<AlbumAttributes, AlbumInput> implements AlbumAttributes {
  public album_id!: string;
  public name!: string;
  public artist!: string
  public artwork_url!: string;
  public spotify_uri!: string;
  public collection_id!: string;
  public user_id!: string;
}

album.init(
  {
    album_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:  true
    },
    name: {
      type: DataTypes.TEXT,
    },
    artist: {
      type: DataTypes.TEXT,
    },
    artwork_url: {
      type: DataTypes.TEXT,
    },
    spotify_uri: {
      type: DataTypes.TEXT
    },
    collection_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: true
  }
);

export default album;