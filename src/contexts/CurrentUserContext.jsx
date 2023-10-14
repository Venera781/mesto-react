import { useCallback } from "react";
import { useMemo } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/Api";

export const CurrentUserContext = createContext(null);
export const useProfile = () => {
  return useContext(CurrentUserContext)[0];
};

export const useUserId = () => {
  return useContext(CurrentUserContext)[0].id;
};

export const useUpdateProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const setUser = useContext(CurrentUserContext)[1];
  const updateProfile = useCallback(
    (name, about) => {
      setIsUpdating(true);
      return api
        .editProfile(name, about)
        .then((data) => {
          setUser(data);
        })
        .finally(() => {
          setIsUpdating(false);
        });
    },
    [setUser]
  );

  return { isUpdating, updateProfile };
};

export const useUpdateAvatar = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const setUser = useContext(CurrentUserContext)[1];
  const updateAvatar = useCallback(
    (avatarLink) => {
      setIsUpdating(true);
      return api
        .updateAvatar(avatarLink)
        .then((data) => {
          setUser(data);
        })
        .finally(() => {
          setIsUpdating(false);
        });
    },
    [setUser]
  );

  return { isUpdating, updateAvatar };
};

const CurrentUserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    return {
      avatar: "",
      name: "",
      about: "",
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

  const ctxValue = useMemo(() => {
    return [userData, setUserData];
  }, [userData]);

  return (
    <CurrentUserContext.Provider value={ctxValue}>
      {children}
    </CurrentUserContext.Provider>
  );
};
export default CurrentUserProvider;
