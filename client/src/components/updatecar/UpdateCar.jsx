import { useEffect } from "react";
import "./updatecar.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";

export default function UpdateCar() {
  const cars = {
    brand: "",
    model: "",
    year: "",
    description: "",
    image: "",
  };

  const [car, setCar] = useState(cars);

  const navigate = useNavigate();

  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setCar({ ...car, image: files[0] });
    } else {
      setCar({ ...car, [name]: value });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/cars/${id}`)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("year", car.year);
    formData.append("description", car.description);
    if (car.image instanceof File) {
      formData.append("image", car.image);
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/cars/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(response.data.message, "Car updated successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="updateCar">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i>
      </Link>
      <h3>Update Car</h3>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="brandCar">Brand:</label>
          <input
            value={car.brand}
            onChange={inputHandler}
            type="text"
            className="form-control"
            id="brandCar"
            name="brand"
            placeholder="Enter brand"
          />
        </div>
        <div className="form-group">
          <label htmlFor="modelCar">Model:</label>
          <input
            value={car.model}
            onChange={inputHandler}
            type="text"
            className="form-control"
            id="modelCar"
            name="model"
            placeholder="Enter model"
          />
        </div>
        <div className="form-group">
          <label htmlFor="yearCar">Year:</label>
          <input
            value={car.year}
            onChange={inputHandler}
            type="number"
            className="form-control"
            id="yearCar"
            name="year"
            placeholder="Enter year"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descriptionCar">Description:</label>
          <input
            value={car.description}
            onChange={inputHandler}
            type="text"
            className="form-control"
            id="descriptionCar"
            name="description"
            placeholder="Enter description"
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
          />
        </div>
        <button type="submit" className="btn btn-primary submit">
          Update Car
        </button>
      </form>
    </div>
  );
}
