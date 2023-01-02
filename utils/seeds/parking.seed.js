const  mongoose  = require("mongoose");
const Parking = require("../../src/api/parking/parking.model")

const Parkings = [
  
  {price: 5,
    adress: "Avda de Brasil, 27, 28020-Madrid",      
    busy: "false",
    size: "turismo",
    bookings: [],
    image: "https://images.pexels.com/photos/851305/pexels-photo-851305.jpeg?auto=compress&cs=tinysrgb&w=600",
    latitude: 40.45973188744278,
    longitude: -3.694223264790685
    
  },
  {price: 5,
    adress: "Calle de Gral. Margallo, 22, 28020-Madrid",      
    busy: "false",
    size: "caravana",
    bookings: [],
    image: "https://images.pexels.com/photos/938580/pexels-photo-938580.jpeg?auto=compress&cs=tinysrgb&w=600",
    latitude: 40.458355702329435,
    longitude: -3.694960142330148,
  },
  {price: 4,
    adress: "Calle de Francisco Gervás, 17, 28020-Madrid",      
    busy: "false",
    size: "furgoneta",
    bookings: [],
    image: "https://images.pexels.com/photos/5126839/pexels-photo-5126839.jpeg?auto=compress&cs=tinysrgb&w=600",
    latitude: 40.462565273322255,
    longitude: -3.694725137115054,
  },
  {price: 10,
    adress: "Calle de la Infanta Mercedes, 70, 28020-Madrid",      
    busy: "false",
    size: "camion",
    bookings: [],
    image: "https://images.pexels.com/photos/457418/pexels-photo-457418.jpeg?auto=compress&cs=tinysrgb&w=600",
    latitude: 40.46060177087186,
    longitude: -3.6955615410525255,

  },

  {price: 4,
    adress: "Calle de Sor Ángela de la Cruz, 17, 28020 Madrid",      
    busy: "false",
    size: "turismo",
    bookings: [],
    image: "https://images.pexels.com/photos/315952/pexels-photo-315952.jpeg?auto=compress&cs=tinysrgb&w=600",
    latitude: 40.46060177087186,
    longitude: -3.6955615410525255,
  },
  {price: 7,
    adress: "Calle de la Infanta Mercedes, 62, 28020 Madrid",      
    busy: "false",
    size: "caravana",
    bookings: [],
    image: "https://images.pexels.com/photos/3536522/pexels-photo-3536522.jpeg?auto=compress&cs=tinysrgb&w=600",
    latitude: 40.46092539918706,
    longitude: -3.6967625313217147,
  }, 
  {price: 5,
    adress: "Calle de Francisco Gervás, 10, 28020 Madrid",      
    busy: "false",
    size: "furgoneta",
    bookings: [],
    image: "https://images.pexels.com/photos/1461887/pexels-photo-1461887.jpeg?auto=compress&cs=tinysrgb&w=600",
    latitude: 40.46159440740007,
    longitude: -3.69566877232656,
  },
  {price: 10,
    adress: "Calle de la Infanta Mercedes, 70, 28020-Madrid",      
    busy: "false",
    size: "camion",
    bookings: [],
    image: "https://c8.alamy.com/compes/eneg75/carretilla-o-taller-de-reparacion-de-camiones-garaje-interior-eneg75.jpg",
    latitude: 40.461448971259266,
    longitude: -3.695445167533452, 
  },

  {price: 4,
    adress: "Calle del Poeta Joan Maragall, 38, 28020 Madrid",      
    busy: "false",
    size: "turismo",
    bookings: [],
    image: "https://images.pexels.com/photos/752615/pexels-photo-752615.jpeg?auto=compress&cs=tinysrgb&w=600",
    latitude: 40.46146473225235,
    longitude: -3.6949779251295785,
  },
  {price: 7,
    adress: "Calle de Huesca, 20-22, 28020 Madrid",      
    busy: "false",
    size: "moto",
    bookings: [],
    image: "https://images.pexels.com/photos/5214397/pexels-photo-5214397.jpeg?auto=compress&cs=tinysrgb&w=600",
    latitude: 40.46133995480377,
    longitude: -3.696006615195947, 
  },

  {price: 5,
    adress: "Calle de Sor Ángela de la Cruz, 33, 28020 Madrid",      
    busy: "false",
    size: "turismo",
    bookings: [],
    image: "https://images.pexels.com/photos/6039204/pexels-photo-6039204.jpeg?auto=compress&cs=tinysrgb&w=600",
    latitude: 0.462874,
    longitude: -3.69477, 
  },
  {
    price: 10,
    adress: "Calle de Orense, 69, 28020 Madrid",      
    busy: "false",
    size: "moto",
    bookings: [],
    image: "https://images.pexels.com/photos/2303378/pexels-photo-2303378.jpeg?auto=compress&cs=tinysrgb&w=600",
    latitude: 40.4582536,
    longitude: -3.6949427,
  },
    
    

  

];



mongoose.connect("mongodb+srv://root:root@cluster0.0lvrnql.mongodb.net/ValetApp?retryWrites=true&w=majority")

  .then(async () => {
    const allParking = await Parking.find().lean();
    
    if(!allParking.length) {
      console.log('[seed]: No se encuentran Parking, continuo...')
    } else {
      console.log(`[seed]: Encontrados ${allParking.length} Parking.`);
      await Parking.collection.drop();
      console.log('[seed]: Colección Parking eliminada correctamente');
    }
  })
  .catch((error) => console.log('[seed]: Error eliminando la colección -->', error))
  .then(async() => {
    await Parking.insertMany(Parkings);
    console.log('[seed]: Nuevos Parkings añadidos con éxito');
  })
  .catch((error) => console.log('[seed]: Error añadiendo los Parkings', error))
  .finally(() => mongoose.disconnect());