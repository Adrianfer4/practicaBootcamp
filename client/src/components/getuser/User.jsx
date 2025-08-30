import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async (params) => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data ", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/users/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success("User deleted successfully");
      })
        .catch((error) => {
        console.log(error);
        });
    };

  return (
    <div className="userTable">
      <Link to="/add" type="button" className="btn btn-primary">
        Add user <i className="fa-solid fa-user-plus"></i>
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className="actionsButtons">
                    <Link to={`/update/${user._id}`} type="button" className="btn btn-info">
                    <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => deleteUser(user._id)} type="button" className="btn btn-danger">
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
