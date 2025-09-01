import express from 'express';
import { getAllCars, create, getCarById, updateCar, deleteCar } from '../controller/carController.js';
import multer from "multer";
import Car from "../model/carModel.js";

const route = express.Router();

// Configuración de Multer para guardar imágenes en /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Ruta para crear un auto con imagen
route.post("/car", upload.single("image"), async (req, res) => {
  try {
    const { brand, model, year, description } = req.body;
    const newCar = new Car({
      brand,
      model,
      year,
      description,
      image: req.file ? req.file.filename : null,
    });

    await newCar.save();
    res.json({ message: "Car created successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.post('/car', create);
route.get('/cars', getAllCars);
route.get('/cars/:id', getCarById);
route.put('/update/cars/:id', upload.single("image"), updateCar);
route.delete('/delete/cars/:id', deleteCar);

export default route;