import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store"; // Adjusted import path to the store folder
import Home from "./pages/Home/home";
import Login from "./pages/Login/login"; // Adjusted import path
import Signup from "./pages/Signup/signup"; // Adjusted import path
import Profile from "./pages/Profilepage/profilepage"; // Adjusted import path

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/user/*">
            <Route path="get-profile" element />
            <Route path="update-password" />
          </Route>
          <Route path="/error/*">
            <Route path="server-error" element={}/>
          </Route> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
