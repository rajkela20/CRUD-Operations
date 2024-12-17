const { Category, Product } = require('./models');

// Создание категории
const createCategory = async (name) => {
  const category = await Category.create({ name });
  console.log('Category created:', category);
};

// Создание продукта
const createProduct = async (name, price, categoryId) => {
  const product = await Product.create({ name, price, category_id: categoryId });
  console.log('Product created:', product);
};

// Чтение продуктов по категории
const getProductsByCategory = async (categoryId) => {
  const category = await Category.findByPk(categoryId, {
    include: Product
  });
  console.log('Category with Products:', category);
};

// Обновление категории у продукта
const updateProductCategory = async (productId, newCategoryId) => {
  const product = await Product.findByPk(productId);
  if (product) {
    product.category_id = newCategoryId;
    await product.save();
    console.log('Product updated:', product);
  } else {
    console.log('Product not found');
  }
};

// Удаление категории и всех связанных продуктов
const deleteCategoryAndProducts = async (categoryId) => {
  const category = await Category.findByPk(categoryId, {
    include: Product
  });

  if (category) {
    // Удаляем все продукты, связанные с категорией
    await category.destroy({ include: Product });
    console.log('Category and all products deleted');
  } else {
    console.log('Category not found');
  }
};

// Пример использования CRUD операций
const run = async () => {
  await sequelize.sync({ force: true }); // Создаем таблицы

  // Создание категории
  const electronics = await createCategory('Electronics');
  
  // Создание продуктов
  await createProduct('Smartphone', 499.99, electronics.id);
  await createProduct('Laptop', 999.99, electronics.id);

  // Чтение продуктов по категории
  await getProductsByCategory(electronics.id);

  // Обновление категории у продукта
  const productToUpdate = await Product.findOne({ where: { name: 'Smartphone' } });
  const newCategory = await createCategory('Mobile Devices');
  await updateProductCategory(productToUpdate.id, newCategory.id);

  // Удаление категории и продуктов
  await deleteCategoryAndProducts(electronics.id);
};

run().catch(err => console.error(err));