const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const parkingSchema = new Schema(
  {
    adress: {type:String, required: true},
    price:  {type:Number, required: true},
    busy: {type:Boolean, default: false},
    size: {type: String, enum: ["moto", "turismo", "furgoneta", "caravana", "camion"]},
    bookings:[{type: mongoose.Schema.Types.ObjectId, ref:"bookings"}],  
    image: {type: String, required:false},
    users: [{type: mongoose.Schema.Types.ObjectId, ref:"users", required: false}],
    latitude: {type:Number, required: true},
    longitude: {type:Number, required: true},
    
  },
  { 
    timestamps: true,
  }
);

const Parking = mongoose.model("parkings", parkingSchema);

module.exports = Parking;