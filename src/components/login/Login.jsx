import React from "react";
import {Form, Input, Select, SelectItem, Checkbox, Button} from "@heroui/react";
import api from '../../config/api';
import {login} from '../../config/endpoints';
import { useState } from "react";
import {notification} from "../Notification/Notify";
import { useNavigate } from "react-router-dom"; // Import for navigation

export default function App() {
  const [form, setForm] = useState({ username: "yokesh17", password: "yokesh2002" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      console.log(form)
      const res = await api.post(login['login'], form);
      console.log(res)
      if(!localStorage.getItem("token")) { localStorage.setItem("token", res.data.access_token);}
      notification(res.data)
      
      console.log(res.data.message);
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  // Function to navigate to register page
  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-50">
      
      <form onSubmit={handleLogin} className="max-w-full bg-blue-200 p-9 rounded">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-sx text-gray-900 dark:text-white">Username</label>
          <input type="text" name="username" id="username" value={form.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-sx text-gray-900 dark:text-white">Password</label>
          <input type="password" id="password" name="password" value={form.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full pt-1 px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>
        
        {/* Register button */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700 mb-2">Don't have an account?</p>
          <button 
            type="button"
            onClick={goToRegister}
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full pt-1 px-5 py-1.5 text-center"
          >
            Register
          </button>
        </div>
      </form>

    </div>
  );
}
