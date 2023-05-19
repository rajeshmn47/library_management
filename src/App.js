import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./actions/userAction";
import Signup from "./components/auth/signup";
import SignIn from "./components/auth/signin";
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import Admin from "./components/admin/add";
import Dashboard from "./components/admin/dashboard";
import Edit from "./components/admin/edit";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(loadUser());
    console.log(user);
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        {user?.type == "admin" && (
          <>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/list" element={<Admin />} />
            <Route path="/admin/edit/:id" element={<Edit />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
