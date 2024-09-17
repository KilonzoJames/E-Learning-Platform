import { useNavigate } from "react-router-dom";


const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("publicID");
    navigate("/login");
  };
  
  return (
    <div
      className="flex justify-center items-center text-sweetblue shojumaru-regular cursor-pointer text-4xl"
      onClick={handleLogout}
      role="button"
      tabIndex={0}  // Makes the div focusable
      onKeyDown={(e) => e.key === 'Enter' && handleLogout()}  // Allows triggering with keyboard
    >
      Bye!
    </div>
  );
};

export default Logout;
