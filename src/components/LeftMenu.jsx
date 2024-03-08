import { NavLink } from "react-router-dom";
import homeIcon from "../assets/home-icon.svg";
import profileIcon from "../assets/profile-icon.svg";
import { useContext } from "react";
import { LoggedInUserContext } from "../App";

export const LeftMenu = () => {
  const user = useContext(LoggedInUserContext);

  return (
    <menu className="h-full min-w-32 max-w-32 flex flex-col min-h-[calc(100vh-5rem)]">
      <NavLink
        to="/posts"
        end
        activeClassName="active"
        className="flex flex-col p-10 hover:bg-hover"
      >
        <img src={homeIcon} alt="Home" className="" />
        <p>Home</p>
      </NavLink>
      <NavLink
        to={`/profile/${user.id}`}
        activeClassName="active"
        className="flex flex-col p-10 hover:bg-hover"
      >
        <img src={profileIcon} alt="Profile" className="" />
        <p>Profile</p>
      </NavLink>
    </menu>
  );
};
