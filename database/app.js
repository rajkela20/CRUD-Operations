const { createCategory, createProduct, getProductsByCategory, updateProductCategory, deleteCategoryAndProducts } = require('./crudOperation');
const sequelize = require('./database');

const run = async () => {
  try {
    // Sync the database (create tables if they don't exist)
    await sequelize.sync({ force: true });

    // Create categories
    const electronics = await createCategory('Electronics');
    const mobileDevices = await createCategory('Mobile Devices');

    // Create products
    const smartphone = await createProduct('Smartphone', 499.99, electronics.id);
    const laptop = await createProduct('Laptop', 999.99, electronics.id);

    // Get products by category
    await getProductsByCategory(electronics.id);

    // Update product category
    await updateProductCategory(smartphone.id, mobileDevices.id);

    // Get products again after category update
    await getProductsByCategory(mobileDevices.id);

    // Delete category and products
    await deleteCategoryAndProducts(electronics.id);

  } catch (error) {
    console.error('Error running the application:', error);
  }
};

run();