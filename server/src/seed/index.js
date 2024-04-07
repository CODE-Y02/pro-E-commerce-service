const { NODE_ENV } = require("../config");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Varient = require("../models/Varients");

const seedInitData = async () => {
  if (NODE_ENV !== "local") return;

  const isCategories = await Category.find();
  if (isCategories) {
    await Category.deleteMany();
    await Varient.deleteMany();
    await Product.deleteMany();
  }

  const _categories = await craeteCat();
  const promiseArr = _categories.map(
    async (cat) => await createProductWithVarient(cat)
  );

  await Promise.all(promiseArr);
};

const createProductWithVarient = async (cat) => {
  const data = await (
    await fetch(`https://fakestoreapi.com/products/category/${cat.name}`)
  ).json();

  const arr = data.map(async (prod) => {
    const varient = await createVarient(prod);
    await Product.create({
      name: prod.title,
      description: prod.description,
      varients: [...varient],
      category: cat._id,
    });
  });

  await Promise.all(arr);
};

const createVarient = async (data) => {
  const colors = ["red", "blue", "black"];

  const varient = await Varient.create([
    {
      color: colors[Math.floor(Math.random() * colors.length)],
      imageUrl: data.image,
      price: Math.round(Math.random() * 1000),
      stock: Math.round(Math.random() * 100),
    },
  ]);

  return varient;
};

const craeteCat = async () => {
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
