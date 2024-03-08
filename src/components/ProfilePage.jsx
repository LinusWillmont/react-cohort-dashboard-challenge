import { useParams } from "react-router-dom";
import { getRequest, putRequest } from "../utilites/apiRequests";
import { useEffect, useState } from "react";
import { ProfileIcon } from "./General/ProfileIcon";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [successfullSubmit, setSuccesfullSubmit] = useState(false);
  const { userId } = useParams();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setSuccesfullSubmit(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    putRequest(`/contact/${userId}`, formData).then((response) => {
      setUser(response);
      setSuccesfullSubmit(true);
    });
  };

  useEffect(() => {
    getRequest(`/contact/${userId}`).then((responseUser) => {
      setUser(responseUser);
      setFormData(responseUser);
    });
  }, [userId]);

  return !user ? (
    <p>Loading user...</p>
  ) : (
    <div className="bg-secondary p-6 w-full h-auto">
      <div className="flex flex-col bg-white p-5 gap-3 rounded-xl">
        <div className="border-bottom">
          <div className="flex gap-3 py-4 border-b-2 border-bodyBackground ">
            <ProfileIcon user={user} />
            <h2 className="text-xl font-medium">{`${user.firstName} ${user.lastName}`}</h2>
          </div>
        </div>
        <form className="flex flex-col gap-3">
          <div className="flex gap-3">
            <ul className="border-b-2 border-bodyBackground my-2 basis-full">
              <h1 className="text-3xl font-bold text-main">Account info</h1>
              <li className="my-5">
                <label htmlFor="firstName">First name*</label>
                <input
                  className="bg-bodyBackground p-3 rounded-lg w-full"
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleInput}
                  value={formData.firstName}
                />
              </li>
              <li className="my-5">
                <label htmlFor="lastName">Last name*</label>
                <input
                  className="bg-bodyBackground p-3 rounded-lg w-full"
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleInput}
                  value={formData.lastName}
                />
              </li>
              <li className="my-5">
                <label htmlFor="email">Email*</label>
                <input
                  className="bg-bodyBackground p-3 rounded-lg w-full"
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleInput}
                  value={formData.email}
                />
              </li>
            </ul>
            <ul className="border-b-2 border-bodyBackground my-2 basis-full">
              <h1 className="text-3xl font-bold text-main">Adress</h1>
              <li className="my-5">
                <label htmlFor="city">City</label>
                <input
                  className="bg-bodyBackground p-3 rounded-lg w-full"
                  type="text"
                  id="city"
                  name="city"
                  onChange={handleInput}
                  value={formData.city}
                />
              </li>
              <li className="my-5">
                <label htmlFor="street">Street</label>
                <input
                  className="bg-bodyBackground p-3 rounded-lg w-full"
                  type="text"
                  id="street"
                  name="street"
                  onChange={handleInput}
                  value={formData.street}
                />
              </li>
            </ul>
          </div>
          <div className="flex gap-3">
            <ul className=" basis-full">
              <h1 className="text-3xl font-bold text-main">Extra info</h1>
              <li className="my-5">
                <label htmlFor="gender">Gender</label>
                <input
                  className="bg-bodyBackground p-3 rounded-lg w-full"
                  type="text"
                  id="gender"
                  name="gender"
                  onChange={handleInput}
                  value={formData.gender}
                />
              </li>
              <li className="my-5">
                <label htmlFor="favouriteColour">Favorite color</label>
                <input
                  className="bg-bodyBackground p-3 rounded-lg w-full"
                  type="text"
                  id="favouriteColour"
                  name="favouriteColour"
                  onChange={handleInput}
                  value={formData.favouriteColour}
                />
              </li>
            </ul>
            <ul className="basis-full">
              <h1 className="text-3xl font-bold text-main">Company info</h1>
              <li className="my-5">
                <label htmlFor="city">Job title</label>
                <input
                  className="bg-bodyBackground p-3 rounded-lg w-full"
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  onChange={handleInput}
                  value={formData.jobTitle}
                />
              </li>
            </ul>
          </div>
          <button
            onClick={handleSubmit}
            disabled={successfullSubmit}
            className={
              successfullSubmit
                ? "bg-gray text-white hover:cursor-default p-3 rounded-lg"
                : "bg-main text-white p-3 rounded-lg hover:bg-hover"
            }
          >
            {successfullSubmit ? "Saved !" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};
