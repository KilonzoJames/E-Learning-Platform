import { SidebarData } from "./SidebarData";
import PropTypes from "prop-types";

function Sidebar({ setActiveComponent }) {
  
  return (
    <div className="sidebar">
      <ul className="sidebarlist protest-guerrilla-regular">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row gap-4 text-2xl uppercase"
              onClick={() => (setActiveComponent(val.link))}
            >
              <div>{val.icon}</div>
              <div>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  setActiveComponent: PropTypes.func.isRequired, // Ensure setActiveComponent is passed as a function
};
export default Sidebar;
