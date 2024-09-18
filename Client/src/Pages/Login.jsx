import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setError,
  togglePasswordVisibility,
  resetState,
} from "../redux/login_slice";
import { setUser } from "../redux/public_id";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataObject = useSelector((state) => state.login);
  const { email, password, error, showPassword } = dataObject;

  const handleChangeEmail = (event) => {
    dispatch(setEmail(event.target.value));
    dispatch(setError(null)); // Clear the error message when typing
  };

  const handleChangePassword = (event) => {
    dispatch(setPassword(event.target.value));
    dispatch(setError(null)); // Clear the error message when typing
  };
  const toggleVisibility = () => {
    dispatch(togglePasswordVisibility());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    try {
      const response = await fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      // alert(`Logged in ${email} successfully!`);
      Swal.fire({
        position: "top",
        icon: "success",
        title: `Logged in ${email} successfully!`,
        showConfirmButton: false,
        color: "#0163af",
        timer: 4000,
      });
      // Store token in local storage
      localStorage.setItem("token", data.token);
      console.log(formData, data.token);

      // Dispatch action to store user information
      dispatch(setUser({ public_id: data.public_id }));

      // Navigate based on user type
      // const userTypePath = data.user_type === "True" ? "/home" : "/";
      navigate("/home");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      // Clear state and form data
      dispatch(resetState());
      console.log(formData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="form fairplay text-white w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <form action="#" onSubmit={handleSubmit}>
          <div className="title shojumaru-regular">Welcome</div>
          <div className="subtitle playfair">
            Let&apos;s Login to E-Learning!
          </div>
          <div className="input-container ic2">
            <input
              name="username"
              id="email"
              type="text"
              required=""
              placeholder="Email"
              className="input"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className="input-container ic1">
            <input
              required=""
              autoComplete="off"
              placeholder="Password"
              value={password}
              type={showPassword ? "text" : "password"}
              className="input"
              id="password"
              onChange={handleChangePassword}
            />
            <span
              onClick={toggleVisibility}
              className={`absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl ${
                showPassword ? "" : "text-gray-400"
              }`}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="authbtn w-full mt-8" type="text">
            Submit
          </button>
          <div className="forgot-pass m-2">
            <a href="/resetpassword"> Forgot Password?</a>
          </div>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error message */}
          <div className="sign-up m-2">
            Not a member?{" "}
            <a href="/signup" className="font-bold italic text-white">
              Signup now
            </a>
          </div>
          <div className=" m-2">
            <a href="/confirm_email/<token>"> Confirm Email</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
