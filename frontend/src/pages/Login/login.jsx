import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getUserState, userLogin } from "../../Store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const role = "user";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(getUserState);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    const response = dispatch(userLogin(username, password, role));
    
    if(!(userData.error && response.error)){
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-white">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex max-w-4xl w-full border-2 border-transparent hover:border-blue-500 transition duration-300 ease-in-out">
        <div className="w-1/2 p-8 border-r-2 border-transparent hover:border-blue-500 transition duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                User name or email
              </label>
              <div className="flex items-center border rounded w-full py-2 px-3 text-gray-700 shadow focus:outline-none focus:shadow-outline">
                <MdOutlineMailOutline className="mr-2 text-gray-500" />
                <input
                  className="appearance-none bg-transparent flex-1 focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="User name or email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center border rounded w-full py-2 px-3 text-gray-700 shadow focus:outline-none focus:shadow-outline">
                <input
                  className="appearance-none bg-transparent flex-1 focus:outline-none"
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <IoIosEyeOff className="ml-2 text-gray-500" />
                  ) : (
                    <IoIosEye className="ml-2 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div className="flex items-center justify-center mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                type="submit"
                style={{
                  width: "100%", // Make the Login button same size as Google button
                  maxWidth: "280px", // Control the max width of the button
                  height: "48px", // Adjust height for the button
                }}
              >
                Login
              </button>
            </div>
            <div className="flex items-center justify-center mb-4">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-6 border border-gray-400 rounded-lg shadow focus:outline-none focus:shadow-outline flex items-center justify-center"
                type="button"
                style={{
                  width: "100%", // Make the Google button larger
                  maxWidth: "280px", // Control the max width of the Google button
                  height: "48px", // Adjust height for the Google button
                }}
              >
                <FcGoogle className="mr-2" /> Login with Google
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-600 text-center">
            Don't have an account yet?{" "}
            <a className="text-blue-500 hover:text-blue-800" href="#">
              Sign up
            </a>
          </p>
        </div>
        <div
          className="w-1/2"
          style={{
            backgroundImage: "url('/job.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderLeft: "2px solid transparent",
            hover: "border-blue-500 transition duration-300 ease-in-out",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
