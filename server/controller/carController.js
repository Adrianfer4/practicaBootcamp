import Car from "../model/carModel.js";

export const create = async (req, res) => {
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

    res.status(201).json({ message: "Car created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const carData = await Car.find();
    if (!carData || carData.length === 0) {
      return res.status(404).json({ message: "No cars found" });
    }
    return res.status(200).json(carData);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const carExist = await Car.findById(id);
    if (!carExist) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json(carExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const carExist = await Car.findById(id);
    if (!carExist) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Actualizar campos
    carExist.brand = req.body.brand || carExist.brand;
    carExist.model = req.body.model || carExist.model;
    carExist.year = req.body.year || carExist.year;
    carExist.description = req.body.description || carExist.description;

    // Si hay nueva imagen
    if (req.file) {
      carExist.image = req.file.filename;
    }

    await carExist.save();
    return res
      .status(200)
      .json({ message: "Car updated successfully!", car: carExist });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    const carExists = await Car.findById(id);
    if (!carExists) {
      return res.status(404).json({ message: "Car not found" });
    }
    await Car.findByIdAndDelete(id);
    return res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
