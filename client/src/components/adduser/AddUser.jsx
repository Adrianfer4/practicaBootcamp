import React, { useState } from "react";
import "./adduser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddUser() {
  const users = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(users);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/user", user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i>
      </Link>
      <h3>Add New User</h3>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="nameUser">Name:</label>
          <input
            onChange={inputHandler}
            type="text"
            className="form-control"
            id="nameUser"
            name="name"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailUser">Email:</label>
          <input
            onChange={inputHandler}
            type="email"
            className="form-control"
            id="emailUser"
            aria-describedby="emailHelp"
            name="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressUser">Address:</label>
          <input
            onChange={inputHandler}
            type="text"
            className="form-control"
            id="addressUser"
            name="address"
            placeholder="Enter address"
          />
        </div>
        <button type="submit" className="btn btn-primary submit">
          Submit
        </button>
      </form>
    </div>
  );
}
