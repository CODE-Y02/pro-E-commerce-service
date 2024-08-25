const { NODE_ENV } = require("../config");
const Category = require("../models/Category");
const Product = require("../models/Product");

const seedInitData = async () => {
  if (NODE_ENV !== "local") return;

  // const isCategories = await Category.find();
  // if (isCategories) {
  // await Category.deleteMany();
  // await Variant.deleteMany();
  // await Product.deleteMany();

  await Category.collection.drop();
  await Product.collection.drop();
  // }

  const _categories = await createCat();
  const promiseArr = _categories.map(async (cat) => await createProduct(cat));

  await Promise.all(promiseArr);
};

const createProduct = async (cat) => {
  const API_URL = `https://fakestoreapi.com/products/category/${cat.name}`;

  const data = await (await fetch(API_URL)).json();

  const arr = data.map(
    async (prod) =>
      await Product.create({
        name: prod.title,
        modelNumber: prod.id,
        description: prod.description,
        price: Number(prod.price),
        stock: Math.round(Math.random() * 100),
        rating: Number(prod.rating?.rate),
        category: cat._id,
        imgUrl: prod?.image,
      })
  );

  await Promise.all(arr);

  console.log("SEEDED PRODUCTS  for category " + cat.name);
};

const createCat = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/categories`);

  const data = await res.json();

  const _data = data.map((c) => {
    return { name: c };
  });

  return await Category.create(_data);
};

module.exports = {
  seedInitData,
};
