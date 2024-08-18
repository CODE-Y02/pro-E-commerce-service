const { NODE_ENV } = require("../config");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Variant = require("../models/Variant");

const seedInitData = async () => {
  if (NODE_ENV !== "local") return;

  // const isCategories = await Category.find();
  // if (isCategories) {
  // await Category.deleteMany();
  // await Variant.deleteMany();
  // await Product.deleteMany();

  await Category.collection.drop();
  await Variant.collection.drop();
  await Product.collection.drop();
  // }

  const _categories = await createCat();
  const promiseArr = _categories.map(
    async (cat) => await createProductWithVariant(cat)
  );

  await Promise.all(promiseArr);
};

const createProductWithVariant = async (cat) => {
  const API_URL = `https://fakestoreapi.com/products/category/${cat.name}`;
  console.log(API_URL);

  const data = await (await fetch(API_URL)).json();

  const arr = data.map(async (prod) => {
    const variant = await createVariant(prod);
    await Product.create({
      name: prod.title,
      description: prod.description,
      variants: [...variant],
      category: cat._id,
    });
  });

  await Promise.all(arr);
};

const createVariant = async (data) => {
  const colors = ["red", "blue", "black"];

  try {
    const variant = await Variant.create([
      {
        color: colors[Math.floor(Math.random() * colors.length)],
        imageUrl: data.image,
        price: Math.round(Math.random() * 1000),
        stock: Math.round(Math.random() * 100),
      },
    ]);

    return variant;
  } catch (error) {
    console.log("Error creating variant ", data, error);
    return null;
  }
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
