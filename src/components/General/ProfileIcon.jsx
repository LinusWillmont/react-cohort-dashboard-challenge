import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

export const ProfileIcon = ({ user }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonBackground = {
    backgroundColor: isHovered ? "#64dc78" : user.favouriteColour,
    transition: "background-color 0.1s",
  };

  return (
    <button
      style={buttonBackground} // Tailwind cant use dynamic variable as bg-color, therefore style
      className={`rounded-full text-lg w-12 h-12`}
      onClick={() => navigate(`../profile/${user.id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {`${user.firstName[0]}${user.lastName[0]}`}
    </button>
  );
};

ProfileIcon.propTypes = {
  user: PropTypes.object,
};
