import { createContext, useContext } from "react";

const CurrentUserContext = createContext(null);
export const useProfile = () => {
  return useContext(CurrentUserContext);
};

export const useUserId = () => {
  return useContext(CurrentUserContext).id;
};

export default CurrentUserContext;
