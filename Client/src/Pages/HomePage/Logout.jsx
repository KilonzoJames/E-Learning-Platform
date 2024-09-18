import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Logout = () => {
  const navigate = useNavigate();
  
    const handleLogout = () => {
      // Trigger SweetAlert2 here
      Swal.fire({
        title: "Do you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
      }).then((result) => {
        if (result.isConfirmed) {
          // Handle the confirmation logic here if needed
          localStorage.removeItem("token");
          localStorage.removeItem("publicID");
          navigate("/login");
          console.log("User confirmed the alert.");
        }
      });
    };
  return (
    <div
      className="flex justify-center items-center text-sweetblue shojumaru-regular cursor-pointer text-4xl flex-grow"
      onClick={handleLogout}
      role="button"
      tabIndex={0}  // Makes the div focusable
      onKeyDown={(e) => e.key === 'Enter' && handleLogout()}  // Allows triggering with keyboard
    >Logout!</div>
  );
};

export default Logout;
