import { useCallback, useEffect, useMemo } from "react";
import cx from "../utils/cx";
import { usePopup, useSetPopup } from "../providers/PopupProvider";
import PopupConfirm from "./PopupConfirm";
import PopupEditAvatar from "./PopupEditAvatar";
import PopupEditProfile from "./PopupEditProfile";
import PopupCard from "./ImagePopup";
import PopupAddImage from "./PopupAddImage";

const Popup = () => {
  const type = usePopup();
  const setType = useSetPopup();
  const popupContent = useMemo(() => {
    switch (type?.name) {
      case "element":
        return <PopupCard link={type.link} title={type.title} />;
      case "profile":
        return <PopupEditProfile />;
      case "addimage":
        return <PopupAddImage />;
      case "confirm":
        return <PopupConfirm  cardId={type.cardId}/>;
      case "update":
        return <PopupEditAvatar />;

      default:
        return null;
    }
  }, [type]);

  const handleClose = useCallback(() => {
    setType(null);
  }, [setType]);

  const handleClickOverlay = (evt) => {
    const clickEl = evt.target;
    if (!clickEl.closest(".popup__container")) {
      handleClose();
    }
  };
  const isOpened = popupContent !== null;
  useEffect(() => {
    if (isOpened) {
      const handleEscClose = (evt) => {
        if (evt.code === "Escape") {
          handleClose();
        }
      };

      window.addEventListener("keydown", handleEscClose);

      return () => {
        window.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [isOpened, handleClose]);

  return (
    <div
      className={cx("popup", `popup_type_${type}`, isOpened && "popup_opened")}
      onClick={handleClickOverlay}
    >
      <div className="popup__container">
        {popupContent}
        <button
          onClick={handleClose}
          className="popup__button popup__close-btn"
          type="button"
        ></button>
      </div>
    </div>
  );
};
export default Popup;
