import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

const PopupAddImage = ({ placename, link }) => {
  const [isSaving, setIsSaving] = useState(false);
  return (
    <PopupWithForm
      name="addimage"
      title="Новое место"
      buttonTitle={isSaving ? "Сохранение..." : "Сохранить"}
    >
      <input
        className="popup__input"
        type="text"
        id="placename"
        name="placename"
        placeholder="Название"
        required
        minlength="2"
        maxlength="30"
        value={placename}
      />
      <span className="placename-error popup__input-error">
        Вы пропустили это поле.
      </span>
      <input
        className="popup__input"
        type="url"
        id="link"
        name="link"
        placeholder="Ссылка на картинку"
        value={link}
        //style={{ backgroundImage: `url(${link})` }}
        required  
      />
      <span className="link-error popup__input-error popup__input-error_last">
        Введите адрес сайта.
      </span>
    </PopupWithForm>
  );
};

export default PopupAddImage;
