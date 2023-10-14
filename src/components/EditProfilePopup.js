import { useState } from "react";
import { useProfile, useUpdateProfile } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useSetPopup } from "../contexts/PopupProvider";

const EditProfilePopup = () => {
  const setType = useSetPopup();
  const { isUpdating, updateProfile } = useUpdateProfile();
  const currentUser = useProfile();

  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile(name, about)
      .then(() => setType(null))
      .catch((error) => {
        console.log("Ошибка при отправке профиля", error);
      });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonTitle={isUpdating ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        id="name"
        name="name"
        placeholder="Имя"
        value={name}
        required
        minLength="2"
        maxLength="40"
        onChange={(evt) => {
          setName(evt.target.value);
        }}
      />
      <span className="name-error popup__input-error">
        Вы пропустили это поле.
      </span>
      <input
        className="popup__input"
        type="text"
        id="profession"
        name="profession"
        placeholder="Профессия"
        value={about}
        required
        minLength="2"
        maxLength="200"
        onChange={(evt) => {
          setAbout(evt.target.value);
        }}
      />
      <span className="profession-error popup__input-error popup__input-error_last">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
