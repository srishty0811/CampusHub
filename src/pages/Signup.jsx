import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/operations/authAPI";
import signupImg from "../assets/Images/signup.webp";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password } = formData;
    dispatch(signUp(firstName, lastName, username, email, password, navigate));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-10 bg-gray-100">
      
      {/* Left: Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img src={signupImg} alt="Signup" className="max-w-md rounded-lg shadow-lg" />
      </div>

      {/* Right: Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create Your Account</h1>
        <p className="text-gray-600 mb-6">
          Join the millions learning on Study Notes.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
