import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setConfirmPassword,
  setPasswordsMatch,
  resetState,
} from "../redux/signup_slice";
function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataObject = useSelector((state) => state.user);
  const { passwordsMatch, error } = dataObject;

  function handleSubmit(e) {
    e.preventDefault();
    if (dataObject.password !== dataObject.confirmPassword) {
      dispatch(setPasswordsMatch(false)); // Setting mismatch flag to true when passwords don't match
    } else {
      dispatch(setPasswordsMatch(true)); // Setting mismatch flag to false when passwords match
      patchRequest();
    }
  }
  function patchRequest() {
    const formData = {
      email: dataObject.email,
      password: dataObject.password,
    };
    const url = "/api/resetpassword";
    const patchData = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(url, patchData)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        navigate("/login");
        alert("Password updated successfully!");
      })
      .catch((error) => {
        // Handle any errors in the fetch or JSON parsing
        console.error("Error:", error);
      });
  }
  return (
    <section>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-sweetblue rounded-[24px] fairplay py-24 px-12 mx-auto md:px-16 lg:px-20 max-w-7xl text-white">
          <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col">
              <div>
                <h2 className="shojumaru-regular text-4xl text-black">
                  Reset password
                </h2>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-4 gap-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="input1"
                  value={dataObject.email}
                  onChange={(e) =>
                    dispatch(
                      setEmail({
                        field: "email",
                        value: e.target.value,
                      })
                    )
                  }
                />
                <input
                  type="password"
                  name="password"
                  value={dataObject.password}
                  placeholder="pA$$w0Rd"
                  className="input1"
                  onChange={(e) =>
                    dispatch(
                      setPassword({
                        field: "password",
                        value: e.target.value,
                      })
                    )
                  }
                />
                <input
                  name="confirmPassword"
                  type="password"
                  value={dataObject.confirmPassword}
                  placeholder="Confirm password"
                  className="input1"
                  onChange={(e) =>
                    dispatch(
                      setConfirmPassword({
                        field: "confirmPassword",
                        value: e.target.value,
                      })
                    )
                  }
                />
                {!passwordsMatch && (
                  <p className="text-red-500">
                    Passwords do not match. Please try again.
                  </p>
                )}
                {error && <p className="text-red-500">{error}</p>}{" "}
                {/* Display error message */}
                <div className="col-span-full">
                  <button type="submit" className="input1 rounded-full">
                    Submit your request
                  </button>
                  <p></p>
                  <a
                    href="/login"
                    className="underline text-blue-50 text-lg rounded-md font-light tracking-wide py-1 px-2"
                  >
                    Back to Login
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
