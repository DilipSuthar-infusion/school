import { DataTypes, ENUM } from 'sequelize';
import sequelize from '../config/database.js';
  const Gallery = sequelize.define('Gallery', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    imgcategory:{
        type:String,
        allowNull: false
    },
    galleryImgPath:{
        type: String,
        allowNull: false
    }
    
  }, {
    timestamps: true,
    tableName: 'Gallery',
  });

 

export default Gallery;
