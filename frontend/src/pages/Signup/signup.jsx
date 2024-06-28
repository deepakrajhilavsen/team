import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserState, userSignup } from "../../Store/slices/userSlice";

const Signup = () => {
  const role = "user";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasNumber: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasSpecialChar: false,
  });

  const dispatch = useDispatch();
  const userData = useSelector(getUserState);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const checkPasswordStrength = (password) => {
    const hasNumber = /\d/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      hasNumber,
      hasLowerCase,
      hasUpperCase,
      hasSpecialChar,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(userSignup(email, password, role));
    if (!(userData.error && response.error)) {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-white">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex max-w-4xl w-full border-2 border-transparent hover:border-blue-500 transition duration-300 ease-in-out">
        <div className="w-1/2 p-8 border-r-2 border-transparent hover:border-blue-500 transition duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-6">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <div className="flex items-center border rounded w-full py-2 px-3 text-gray-700 shadow focus:outline-none focus:shadow-outline">
                <MdOutlineMailOutline className="mr-2 text-gray-500" />
                <input
                  className="appearance-none bg-transparent flex-1 focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="flex items-center border rounded w-full py-2 px-3 text-gray-700 shadow focus:outline-none focus:shadow-outline">
                <input
                  className="appearance-none bg-transparent flex-1 focus:outline-none"
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <IoIosEyeOff className="ml-2 text-gray-500" /> : <IoIosEye className="ml-2 text-gray-500" />}
                </button>
              </div>
              {password && (
                <div className="text-sm mt-1">
                  <p>Password Strength:</p>
                  <ul className="list-disc list-inside">
                    <li className={`text-${passwordStrength.hasNumber ? "green" : "red"}-600`}>Contains at least one number</li>
                    <li className={`text-${passwordStrength.hasLowerCase ? "green" : "red"}-600`}>Contains at least one lowercase letter</li>
                    <li className={`text-${passwordStrength.hasUpperCase ? "green" : "red"}-600`}>Contains at least one uppercase letter</li>
                    <li className={`text-${passwordStrength.hasSpecialChar ? "green" : "red"}-600`}>Contains at least one special character</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                type="submit"
                style={{
                  width: "100%", // Adjust button width
                  maxWidth: "280px", // Control max width
                  height: "48px", // Adjust button height
                }}
              >
                Sign up
              </button>
            </div>
            <div className="flex items-center justify-center mb-4">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-6 border border-gray-400 rounded-lg shadow focus:outline-none focus:shadow-outline flex items-center justify-center"
                type="button"
                style={{
                  width: "100%", // Adjust button width
                  maxWidth: "280px", // Control max width
                  height: "48px", // Adjust button height
                }}
              >
                <FcGoogle className="mr-2" /> Sign up with Google
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-600 text-center">
            Already have an account? <a className="text-blue-500 hover:text-blue-800" href="#">Login</a>
          </p>
        </div>
        <div
          className="w-1/2 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: "url('/signup.png')" }}
        ></div>
      </div>
    </div>
  );
};

export default Signup;
