import { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { useSendCard } from "../contexts/CardsProvider";
import { useSetPopup } from "../contexts/PopupProvider";

const AddPlacePopup = () => {
  const { isUpdating, sendCard } = useSendCard();

  const [namePlace, setNamePlace] = useState("");
  const [linkPlace, setLinkPlace] = useState("");
  const setType = useSetPopup();

  function handleSubmit(e) {
    e.preventDefault();
    sendCard(namePlace, linkPlace)
      .then(() => setType(null))
      .catch((error) => {
        console.log("Ошибка при добавлении карточки", error);
      });
  }

  return (
    <PopupWithForm
      name="addimage"
      title="Новое место"
      buttonTitle={isUpdating ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        id="placename"
        name="placename"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={namePlace}
        onChange={(evt) => setNamePlace(evt.target.value)}
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
        value={linkPlace}
        required
        onChange={(evt) => setLinkPlace(evt.target.value)}
      />
      <span className="link-error popup__input-error popup__input-error_last">
        Введите адрес сайта.
      </span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
