import React, { useEffect, useState } from "react";
import "./car.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import CarModal from "../modalcar/ModalDetails";

export default function Car() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShow = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const fetchData = async (params) => {
      try {
        const response = await axios.get("http://localhost:8000/api/cars");
        setCars(response.data);
      } catch (error) {
        console.log("Error while fetching data ", error);
      }
    };
    fetchData();
  }, []);

  const deleteCar = async (carId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/cars/${carId}`)
      .then((response) => {
        setCars((prevCar) => prevCar.filter((car) => car._id !== carId));
        toast.success("Car deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="carTable">
      <h1 className="title">Car Management</h1>
      <Link to="/add" type="button" className="btn btn-primary">
        Add car <i className="fa solid fa-car-burst"></i>
      </Link>
      <table className="table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">Year</th>
            <th scope="col">Actions</th>
            <th scope="col">Information</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>
                  <button
                    onClick={() => handleShow(car)}
                    className="btn btn-info"
                  >
                    Ver Información
                  </button>
                </td>
                <td className="actionsButtons">
                  <Link
                    to={`/update/${car._id}`}
                    type="button"
                    className="btn btn-info"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>

                  {selectedCar && (
                    <CarModal
                      car={selectedCar}
                      show={showModal}
                      handleClose={handleClose}
                    />
                  )}
                  <button
                    onClick={() => deleteCar(car._id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
