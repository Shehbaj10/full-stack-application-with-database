module.exports = (sequelize, DataTypes) =>
    sequelize.define("cart", {
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
