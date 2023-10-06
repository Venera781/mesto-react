import { useProfile } from "../../providers/ProfileProvider";
import { useSetPopup } from "../../providers/PopupProvider";
import { useCallback } from "react";

const Profile = () => {
  const { avatar, name, profession } = useProfile();

  const setPopupType = useSetPopup();

  const handleEditProfile = useCallback(() => {
    setPopupType({ name: "profile" });
  }, [setPopupType]);

  const handleEditAvatar = useCallback(() => {
    setPopupType({ name: "update" });
  }, [setPopupType]);

  const handleOpenAddImage = useCallback(() => {
    setPopupType({ name: "addimage" });
  }, [setPopupType]);

  return (
    <section className="profile">
      <div className="profile__avatar-wrapper" onClick={handleEditAvatar}>
        <img className="profile__avatar" src={avatar} alt={`Фото ${name}`} />
      </div>
      <div className="profile__info">
        <div className="profile__wrapper">
          <h1 className="profile__name">{name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактировать"
            onClick={handleEditProfile}
          ></button>
        </div>
        <p className="profile__profession">{profession}</p>
      </div>
      <button
        className="profile__add-button"
        type="button"
        aria-label="Добавить фото"
        onClick={handleOpenAddImage}
      ></button>
    </section>
  );
};
export default Profile;
