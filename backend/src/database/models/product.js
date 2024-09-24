module.exports = (sequelize, DataTypes) =>
    sequelize.define("product", {
      name: {
        type: DataTypes.STRING(32),
        primaryKey: true
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT(32),
        allowNull: false
      },
      inSpecial: {
        type: DataTypes.STRING(32),
        allowNull: false
      }
    }, {
        // Don't add the timestamp attributes (updatedAt, createdAt).
        timestamps: false
      });
  