import { useEffect } from "react";
import "./updateuser.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";

export default function UpdateUser() {
  const users = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(users);

  const navigate = useNavigate();

  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/users/${id}`, user)
      .then((response) => {
        toast.success("User updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="updateUser">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i>
      </Link>
      <h3>Update User</h3>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="nameUser">Name:</label>
          <input
            value={user.name}
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
            value={user.email}
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
            value={user.address}
            onChange={inputHandler}
            type="text"
            className="form-control"
            id="addressUser"
            name="address"
            placeholder="Enter address"
          />
        </div>
        <button type="submit" className="btn btn-primary submit">
          Update
        </button>
      </form>
    </div>
  );
}
