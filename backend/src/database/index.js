const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize instance.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models with timestamps.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.reply = require("./models/reply.js")(db.sequelize, DataTypes);


//cart associations
db.cart.belongsTo(db.product, { foreignKey: "name", allowNull: false, onDelete: 'CASCADE' });

//review associations
db.review.belongsTo(db.user, { foreignKey: "email", allowNull: false, onDelete: 'CASCADE' });
db.review.belongsTo(db.product, { foreignKey: "product_name", allowNull: false, onDelete: 'CASCADE' });

//reply accociations
db.reply.belongsTo(db.review, {foreignKey: "description", allowNull: false, onDelete: 'CASCADE'});
db.reply.belongsTo(db.user, { foreignKey: "email", allowNull: false, onDelete: 'CASCADE' });


// Sync database schema and seed data.
db.sync = async () => {
  // Sync schema with Sequelize's built-in sync function.
  await db.sequelize.sync();

  // Seed data if necessary.
  await seedData();
  await productseedData();
  await reviewseedData();
};

// Seed data function.
async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0) return;

  const argon2 = require("argon2");

  // Hash passwords.
  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  // Create user with seed data.
  await db.user.create({ email: "mbolger@gmail.com", password_hash: hash, name: "Matthew" });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ email: "shekhar@gmail.com", password_hash: hash, name: "Shekhar" });
}

async function productseedData() {
  const product_count = await db.product.count();
  if (product_count === 0) {
    await db.product.bulkCreate([
      {
        name: 'Blueberry Muffins',
        description: 'Delicious and freshly baked blueberry muffins.',
        price: 5.99,
        inSpecial: "Yes"
      },
      {
        name: 'Quinoa Salad',
        description: 'Healthy and nutritious quinoa salad.',
        price: 8.99,
        inSpecial: "No"
      },
      {
        name: "Mango",
        description: "Sweet and juicy organic mangoes.",
        price: 7.95,
        inSpecial: "Yes"
      },
      {
        name: 'Organic Maple Syrup',
        description: 'Pure and rich organic maple syrup.',
        price: 9.99,
        inSpecial: "No"
      },
      {
        name: 'Organic Pineapples',
        description: 'Fresh and tangy organic pineapples.',
        price: 6.99,
        inSpecial: "Yes"
      },
      {
        name: 'Organic Broccoli',
        description: 'Green and crunchy organic broccoli.',
        price: 4.49,
        inSpecial: "Yes"
      },
      {
        name: 'Cashew Milk',
        description: 'Creamy and smooth cashew milk.',
        price: 4.99,
        inSpecial: "Yes"
      },
      {
        name: 'Organic Zucchini',
        description: 'Fresh and tender organic zucchini.',
        price: 3.99,
        inSpecial: "No"
      },
      {
        name: 'Organic Avocados',
        description: 'Creamy and flavorful organic avocados.',
        price: 2.79,
        inSpecial: "No"
      },
      {
        name: 'Organic Lettuce',
        description: 'Crisp and fresh organic lettuce.',
        price: 1.99,
        inSpecial: "No"
      },
      {
        name: 'Organic Beets',
        description: 'Sweet and earthy organic beets.',
        price: 2.49,
        inSpecial: "No"
      },
      {
        name: 'Organic Strawberries',
        description: 'Sweet and juicy organic strawberries.',
        price: 5.99,
        inSpecial: "No"
      }
    ]);
  }
}

async function reviewseedData() {
  const reviews_count = await db.review.count();
  if (reviews_count === 0){
    await db.review.create({
    description: "This is a sample review.",
    rating: 5 ,
    email: 'shekhar@gmail.com',
    product_name: 'Organic Pineapples'
  });
}
}

module.exports = db;