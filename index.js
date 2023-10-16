require("dotenv").config()
const server = require("./src/app.js")
const {conn} = require ("./src/db.js")
const {PORT} = process.env

// const engine= require('ejs-mate'); 
// const path= require('path')

conn.sync({ force:false}).then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening at ${PORT}`); 
    });
  });
  