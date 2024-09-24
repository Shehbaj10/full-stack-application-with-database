module.exports = (sequelize, DataTypes) =>
    sequelize.define("reply", {
      reply_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      }
      
    }, {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false
    });
  