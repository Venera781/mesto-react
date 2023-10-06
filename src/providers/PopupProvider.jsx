import { createContext, useContext, useState } from "react";

const PopupContext = createContext(null);
const PopupSetContext = createContext(null);
export const usePopup = () => {
  return useContext(PopupContext);
};

export const useSetPopup = () => {
  return useContext(PopupSetContext);
};

const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState(null);

  return (
    <PopupContext.Provider value={popup}>
      <PopupSetContext.Provider value={setPopup}>
        {children}
      </PopupSetContext.Provider>
    </PopupContext.Provider>
  );
};
export default PopupProvider;
