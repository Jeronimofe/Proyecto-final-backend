const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const express = require ('express');
const parkingRoutes = require ("./src/api/parking/parking.routes");
const bookingsRoutes = require ("./src/api/bookings/bookings.routes")
const userRoutes = require ("./src/api/users/users.routes")
require("dotenv").config();
const db = require ("./utils/db");

const server = express();
const PORT=4000 
db.connectDb();


cloudinary.config({
    cloud_name:"dbso6jzlm",
    api_key:"167598588342623",
    api_secret:"b0zNF9XvuSZ7JXOqRTRBQQQeZL8"

  })

  server.use(cors({
    origin: "*",
    credentials: true
  }));
  
  
  server.use(express.json({limit: "5mb"}));
  
  server.use(express.urlencoded({ extended: false }));
  server.use("/parkings", parkingRoutes);
  server.use("/bookings", bookingsRoutes);
  server.use("/users", userRoutes);

  server.use("*", (req, res) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    return res.status(error.status).json(error.message);
  });
  
  server.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
  });
  


server.listen (PORT, () => {
})




