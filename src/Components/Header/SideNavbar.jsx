import style from "./SideNavBar.module.css";

import { useNavigate } from "react-router-dom";

const SideNavBar = () => {
  const nevegation = useNavigate();
  const generalHandeler = () => {
    nevegation("/general");
  };
  const logoutHandler = () => {
    localStorage.removeItem("user");
    nevegation("/login");
    window.location.reload(false)
  };
  return (
    <aside>
      <nav>
        <ul>
          <li>All Channels</li>
          <hr />
          <li onClick={generalHandeler}># general</li>
          <li># random</li>
          <li onClick={logoutHandler}># Logout</li>
        </ul>
      </nav>
    </aside>
  );
};
export default SideNavBar;
