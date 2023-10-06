import { useState } from "react";
import PopupWithForm from "../PopupWithForm";

const PopupEditProfile = ({ name, profession }) => {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonTitle={isSaving ? "Сохранение..." : "Сохранить"}
    >
      <input
        className="popup__input"
        type="text"
        id="name"
        name="name"
        placeholder="Имя"
        value={name}
        required
        minlength="2"
        maxlength="40"
        onChange={() => {}}
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
        value={profession}
        required
        minlength="2"
        maxlength="200"
      />
      <span className="profession-error popup__input-error popup__input-error_last">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  );
};

export default PopupEditProfile;
