import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const ProfileIcon = ({ user }) => {
	const navigate = useNavigate();

	return (
		<button className="rounded-full text-lg w-12 h-12"
			onClick={() => navigate(`../profile/${user.id}`)}
			style={{ backgroundColor: `${user.favouriteColour}` }}
		>
			{`${user.firstName[0]}${user.lastName[0]}`}
		</button>
	);
};

ProfileIcon.propTypes = {
	user: PropTypes.object,
};
