const {
    Property,
    Category,
    Location,
    Users,
    UsersGoogle,
  } = require("../../db");
  const cloudinary = require("cloudinary").v2;
  require("dotenv").config();
  const { CLOUD_NAME, CLOUD_API, CLOUD_SECRET } = process.env;
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API,
    api_secret: CLOUD_SECRET,
  });
  
  async function createProperty(form) {
    const input = form;
  
    const {
      title,
      description,
      image,
      numBeds,
      numBaths,
      nightPrice,
  
      homeCapacity,
      email,
      password
    } = input;
  
    if (
      !title ||
      !description ||
      !image ||
      !numBaths ||
      !numBeds ||
      !nightPrice ||
      !homeCapacity ||
      !email
    ) {
      throw new Error("Missing required data");
    }
  
    const imageUrls = [];
    for (const imageData of image) {
      const result = await cloudinary.uploader.upload(imageData, {
        folder: "productsDetail",
      });
      imageUrls.push(result.secure_url);
    }
  
    const newProperty = {
      title,
      description,
      image: imageUrls,
      numBaths,
      numBeds,
      nightPrice,
  
      homeCapacity,
    };
  
    const createdProperty = await Property.create(newProperty);
  
    const categorys = input.Category;
  
    if (categorys) {
      const category = await Category.findOne({ where: { name: categorys } });
      if (!category) {
        throw new Error(`Category "${categorys}" doesn't exist`);
      }
      await createdProperty.setCategory(category);
    }
  
    const location = input.Location;
    if (location) {
      const loc = await Location.findOne({ where: { direction: location } });
      if (!loc) {
        throw new Error(`Location "${loc}" doesn't exist`);
      }
      await createdProperty.setLocation(loc);
    }
  
    if (email) {
      const userGoogle = await UsersGoogle.findOne({
        where: { email },
      });
      if (userGoogle) {
        await createdProperty.setUsersGoogle(userGoogle);
      } else {
        throw new Error("Esta renta no pertenece a ningún usuario");
      }
    }
    if (email) {
      const user = await Users.findOne({
        where: { email },
      });
      if (user) {
        await createdProperty.setUser(user);
      } else {
        throw new Error("Esta renta no pertenece a ningún usuario");
      }
    }
  
    console.log(createdProperty);
    return createdProperty;
  }
  
  module.exports = createProperty;