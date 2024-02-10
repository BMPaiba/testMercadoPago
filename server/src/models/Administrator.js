const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Administrator",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      }
      
    },
    { timestamps: false }
  );
};
