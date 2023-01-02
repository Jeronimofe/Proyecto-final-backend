const express = require('express');
const Parking = require('./parking.model');
const upload = require("../../middlewares/file");
const { isAuth, isAdmin } = require('../../middlewares/auth');
const router = express.Router();

//* FUNCION QUE RECOGE TODOS LOS PARKINGS
router.get('', async(req, res, next) => {
  try {
    const allParkings = await Parking.find().populate("bookings").populate("users");
    return res.status(200).json(allParkings);
  } catch(error) {
    return next(error);
  }
});

//* FUNCION QUE RECOGE UN PARKING POR ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const ParkingToFind = await Parking.findById(id);
    return res.status(200).json(ParkingToFind);
  } catch (error) {
    return next(error)
  }
});

//* FUNCIÓN QUE RECOGE UN PARKING POR NOMBRE
router.get('/getbyname/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const parkingToFind = await Parking.findOne({name: name});
    return res.status(200).json(parkingToFind);
  } catch (error) {
    return res.status(500).json('No se encontró el parking');
  }
});

//* FUNCIÓN QUE CREA UN PARKING
// lo que va dentro de upload.single es el campo del model en el que va la imagen
router.post('/create', upload.single("image"), async (req, res, next) => {

  try {
    const parking = req.body;
    if (req.file) {
      parking.image = req.file.path;
    }
    const newParking = new Parking(parking);
    const created = await newParking.save();
    return res.status(201).json(created);
  } catch (err) {
    return next(err);

  }

});


//* FUNCIÓN QUE ELIMINA UN PARKING
router.delete('/delete/:id',async (req, res, next) => {

  try {
    const id = req.params.id;
    const parkingToDelete = await Parking.findByIdAndDelete(id);
    return res.status(200).json("Se ha conseguido borrar el parking");
  } catch (error) {
    return next(error);
  }

});

//* FUNCIÓN QUE EDITA UN PARKING
router.put('/edit/:id', upload.single("img"), async (req, res, next) => {

  try {
    const id = req.params.id;
    const parking = req.body;
    const parkingOld = await Parking.findById(id);
    if (req.file) {
      if (parkingOld.img) {
        deleteFile(parkingOld.img);
      }
      parking.img = req.file.path;
    }
    if (parkingOld.bookings) {
      parking.bookings=[...parkingOld.bookings, req.body.bookings]
    }
    const parkingModify = new Parking(parking);
    console.log(parkingModify)
    parkingModify._id = id;
    const parkingUpdated = await Parking.findByIdAndUpdate(id, parkingModify);
    return res.status(200).json({mensaje: "Se ha conseguido editar el parking", parkingModificado: parkingUpdated});
  } catch (error) {
    return next(error);
  }

})

module.exports = router;
