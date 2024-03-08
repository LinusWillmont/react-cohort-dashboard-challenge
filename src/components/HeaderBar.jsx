import { useContext } from "react";
import titleIcon from "../assets/title-header.svg";
import { ProfileIcon } from "./General/ProfileIcon";
import { LoggedInUserContext } from "../App";

export const HeaderBar = () => {
	const user = useContext(LoggedInUserContext);
	return (
		<header className="h-20 flex justify-between bg-main p-4 w-full box-border" >
			<img src={titleIcon} alt="Title icon" />
			<ProfileIcon user={user} />
		</header>
	);
};
