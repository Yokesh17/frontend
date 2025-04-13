import React, { useState } from "react";
import api from '../../config/api';
import { register } from '../../config/endpoints';
import { useNavigate } from "react-router-dom";
import { notification } from "../Notification/Notify";
import {validateEmail} from "../Common/Validations"

export default function Register() {
  const [form, setForm] = useState({ 
    username: "", 
    password: "",
    email: "",
    confirmPassword: "" 
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Basic validation
    if (form.password !== form.confirmPassword) {
      notification({ message: "Passwords do not match", type: "error" });
      return;
    }
    setIsLoading(true);
    try {
      // Replace with your actual registration endpoint
      const res = await api.post(register['register'], {
        username: form.username,
        password: form.password,
        email: form.email,
        confirm_password : form.confirmPassword
      });
      console.log(res,'ded')
      
      notification(res.data);
      if (res.data.status=='success'){navigate('/login');}
    } catch (err) {
      console.log(err);
      notification(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-50">
      <form onSubmit={handleRegister} className="max-w-full bg-green-100 p-2 px-9 rounded">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create an Account</h2>
        
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
          <input 
            type="text" 
            name="username" 
            value={form.username} 
            onChange={handleChange} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-1" 
            required 
          />
        </div>
        
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-1" 
            required 
          />
        </div>
        
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-1" 
            required 
          />
        </div>
        
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword" 
            value={form.confirmPassword} 
            onChange={handleChange} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-1" 
            required 
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full p-1.5 pt-1 text-center disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700 mb-2">Already have an account?</p>
          <button 
            type="button"
            onClick={goToLogin}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full pt-1 p-1.5 text-center"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
