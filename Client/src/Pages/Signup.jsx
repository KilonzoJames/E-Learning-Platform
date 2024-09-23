import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setConfirmPassword,
  setUserType,
  setPasswordsMatch,
  setError,
  togglePasswordVisibility,
  toggleConfPasswordVisibility,
  resetState,
} from "../redux/signup_slice";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataObject = useSelector((state) => state.signup);

  const {
    email,
    password,
    confirmPassword,
    user_type,
    showPassword,
    showConfPassword,
    passwordsMatch,
    error,
  } = dataObject;

  const toggleVisibility = () => {
    dispatch(togglePasswordVisibility());
  };

  const toggleConfirmVisibility = () => {
    dispatch(toggleConfPasswordVisibility());
  };
  function handleSubmit(e) {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      dispatch(setPasswordsMatch(false)); // Dispatch the action with payload false
      return;
    }

    const formData = {
      password: password,
      email: email,
      admin: user_type,
    };

    fetch("/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => {
        return r.json().then((responseData) => {
          console.log("Raw response:", r);
          console.log("Parsed response data:", responseData);
          console.log("FormData sent:", formData);

          if (r.ok) {
            // Success: Show success message
            Swal.fire({
              position: "top",
              icon: "success",
              title: `${email}, you've been registered successfully!`,
              showConfirmButton: false,
              color: "#0163af",
              timer: 5000,
            });

            // Redirect to login after success
            navigate("/login");
          } else {
            console.error("Error:", responseData.message || "Unknown error");

            Swal.fire({
              position: "top",
              icon: "error",
              title: "Registration failed!",
              text: responseData.message || "Unknown error",
              showConfirmButton: true,
              color: "#dc3545",
            });

            // Dispatching the error message to the Redux store
            dispatch(setError(responseData.message || "Registration failed!"));console.log(error)
          }
        });
      })
      .catch((error) => {
        // Handle any network or fetch error
        console.error("Request failed:", error);

        Swal.fire({
          position: "top",
          icon: "error",
          title: "Request failed!",
          text: error.message || "An unexpected error occurred.",
          showConfirmButton: true,
          color: "#dc3545",
        });

        dispatch(setError(error.message || "An unexpected error occurred."));
      })
      .finally(() => {
        // Clear form fields regardless of success or failure
        dispatch(resetState());
      });
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="bg-sweetblue fairplay rounded-[24px] p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <p
          className="title pl-8 font-semibold 
        tracking-wide  shojumaru-regular hover:scale-110 transition-all duration-500"
        >
          Register
        </p>
        <p className="text-[24px] text-textwhite font-semibold mb-[10px] ">
          Signup now and get full access to our app.
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            className="input1"
            type="email"
            required
            name="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          <label className="relative">
            <input
              placeholder="Password"
              className="input1"
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              minLength={8}
            />
            {/* <span>Password</span> */}
            <span
              onClick={toggleVisibility}
              className={`absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl ${
                showPassword ? "" : "text-gray-400"
              }`}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </label>
          <label className="relative">
            <input
              placeholder="Confirm Password"
              className="input1"
              required
              name="confirmPassword"
              type={showConfPassword ? "text" : "password"}
              value={confirmPassword}
              minLength={8}
              onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
            />
            {/* <span>Confirm password</span> */}
            <span
              onClick={toggleConfirmVisibility}
              className={`absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl ${
                showConfPassword ? "" : "text-gray-400"
              }`}
            >
              {showConfPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </label>
          {!passwordsMatch && (
            <p className="text-red-500">
              Passwords do not match. Please try again.
            </p>
          )}
          <label
            className="text-[20px] text-textwhite font-semibold mb-[10px] cursor-pointer"
            htmlFor="user_type"
          >
            User_Type
          </label>
          <select
            className="input1"
            name="user_type"
            value={user_type}
            onChange={(e) => dispatch(setUserType(e.target.value))}
          >
            <option value="">Select User Type</option>
            <option value="True">Admin</option>
            <option value="False">User</option>
          </select>
          <p className="text-white text-2xl mt-4">
            Already have an account?
            <a className="font-bold italics underline mt-4" href="/login">
              Login
            </a>
          </p>
          {error && <p className="text-red-500">{error}</p>}
          {/* Display error message */}
          <button className="authbtn " type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
