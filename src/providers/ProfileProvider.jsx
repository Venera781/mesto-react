import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/Api";

export const ProfileContext = createContext(null);
export const useProfile = () => {
  return useContext(ProfileContext);
};

export const useUserId = () => {
  return useContext(ProfileContext).id;
};

const ProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    return {
      avatar: "",
      name: "",
      profession: "",
      id: "",
    };
  });

  useEffect(() => {
    api
      .getInfoUser()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log("Ошибка при загрузке", error);
      });
  }, []);

  return (
    <ProfileContext.Provider value={userData}>
      {children}
    </ProfileContext.Provider>
  );
};
export default ProfileProvider;
