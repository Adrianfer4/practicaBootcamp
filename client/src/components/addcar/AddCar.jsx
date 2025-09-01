import React, { useState } from "react";
import "./addcar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddCar() {
  const cars = {
    brand: "",
    model: "",
    year: "",
    description: "",
    image: "",
  };

  const [car, setCar] = useState(cars);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setCar({ ...car, image: files[0] });
    } else {
      setCar({ ...car, [name]: value });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("year", car.year);
    formData.append("description", car.description);
    formData.append("image", car.image);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/car",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addCar">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i>
      </Link>
      <h3>Add New Car</h3>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="brandCar">Brand:</label>
          <input
            onChange={inputHandler}
            type="text"
            className="form-control"
            id="brandCar"
            name="brand"
            placeholder="Enter brand"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="modelCar">Model:</label>
          <input
            onChange={inputHandler}
            type="text"
            className="form-control"
            id="modelCar"
            name="model"
            placeholder="Enter model"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="yearCar">Year:</label>
          <input
            onChange={inputHandler}
            type="number"
            className="form-control"
            id="yearCar"
            name="year"
            placeholder="Enter year"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descriptionCar">Description:</label>
          <input
            onChange={inputHandler}
            type="text"
            className="form-control"
            id="descriptionCar"
            name="description"
            placeholder="Enter description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageCar">Image:</label>
          <input
            onChange={inputHandler}
            type="file"
            className="form-control"
            id="imageCar"
            name="image"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary submit">
          Create Car
        </button>
      </form>
    </div>
  );
}
