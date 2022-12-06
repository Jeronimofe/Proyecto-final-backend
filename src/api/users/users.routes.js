const express = require("express");
const User = require("./users.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../../utils/jwt/jwt");
const upload = require("../../middlewares/file");

router.get("/", async (req, res, next) => {
    try {
        const allUsers = await User.find().populate([{path:"bookings", strictPopulate: false}]).populate([{path:"parkings", strictPopulate: true}]);
        return res.status(200).json(allUsers);
    } catch (error) {
        return next(error);
    }
});

router.post("/create", upload.single("photo"), async (req, res, next) => {
    try {
        const user = req.body;
        const newUser = new User(user);
        if (req.file) {
            
            newUser.photo = req.file.path;
        }
    if (newUser.rol === "user") {
        const created = await newUser.save();
        return res.status(201).json(created);
    }else {
        return res.status(500).json("A donde vas flipao, yo decido quien es admin")
    } 
    } catch (error) {
        return next(error);
    }
});

    router.put('/edit/:id', upload.single("photo"), async (req, res, next) => {

        try {
        const id = req.params.id
        const user = req.body;
        console.log(user)
        const userOld = await User.findById(id);
        console.log(userOld)
        if (req.file) {
            if (userOld.img) {
            deleteFile(userOld.img);
            }
            user.img = req.file.path;
        }
        if (!userOld.bookings) {
            
            user.bookings=[ req.body.bookings]
        } else {
            user.bookings=[...userOld.bookings, req.body.bookings]
        }
        
            
           
        
        if(userOld.parking) {
            user.parking=[...userOld.parking, req.body.parking]
        }
        const userModify = new User(user);
        userModify._id = id;
        const userUpdated = await User.findByIdAndUpdate(id, userModify, {returnOriginal:false} ).populate("bookings");
        return res.status(200).json({mensaje: "Se ha conseguido editar el usuario", userModificado: userUpdated});
        } catch (error) {
        return next(error);
        }
    
    })

router.post("/login", async (req, res, next) => {

    try {
        const userDB = await User.findOne({email: req.body.email}).populate("bookings").populate("parking");
        if (!userDB) {
            return res.status(405).json("No existe el usuario");
        }
        if (bcrypt.compareSync(req.body.password, userDB.password)){
            const token = generateSign(userDB._id, userDB.email);
            return res.status(200).json({token, userDB});
        } else {
            return res.status(200).json("La contraseÃ±a es incorrecta crack");
        }
    } catch (error) {
        return next(error);
    }

});

router.post("/logout", async (req, res, next) => {

    try {
        const token = null;
        return res.status(200).json(token);
    } catch (error) {
        return next(error);
    }

});

router.post("/checksession", async (req, res, next) => {
    console.log(req.header.authorization);
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json(error);
    }
    });

module.exports = router;