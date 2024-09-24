module.exports = (sequelize, DataTypes) =>
    sequelize.define("review", {
      description: {
        type: DataTypes.STRING(100),
        allowNull: true,
        primaryKey: true
      },
      rating: {
        type: DataTypes.INTEGER(10),
        allowNull: true
      }
    }, {
        // Don't add the timestamp attributes (updatedAt, createdAt).
        timestamps: false
      });
  