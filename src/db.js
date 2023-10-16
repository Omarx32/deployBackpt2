require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
        (file) =>
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Property, Sales, PassAdmin, Location, Category, Users, UsersGoogle, Reviews, Reservation } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Category.belongsToMany(Property, {
    through: "Property_Category",
});
Property.belongsTo(Category);

Location.belongsToMany(Property, {
    through: "Property_Location"
});
Property.belongsTo(Location);

Users.hasMany(Reviews);
Reviews.belongsTo(Users);

UsersGoogle.hasMany(Reviews);
Reviews.belongsTo(Users);

Property.hasMany(Reviews);
Reviews.belongsTo(Property);

Users.hasMany(Property)
Property.belongsTo(Users)

UsersGoogle.hasMany(Property)
Property.belongsTo(UsersGoogle)

Property.belongsToMany(Reservation, {
	through:"Reservation_Property",
});
Reservation.belongsTo(Property);

Users.belongsToMany(Reservation, {
	through:"Reservation_User",
});
Reservation.belongsTo(Users);

UsersGoogle.belongsToMany(Reservation, {
	through:"Reservation_UserGoogle",
});
Reservation.belongsTo(UsersGoogle);

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
