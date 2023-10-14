import PopupWithForm from "./PopupWithForm";
import { useDeleteCard } from "../contexts/CardsProvider";
import { useCallback } from "react";
import { useSetPopup } from "../contexts/PopupProvider";

const PopupConfirm = ({ cardId }) => {
  const setType = useSetPopup();
  const deleteCardById = useDeleteCard();
  const deleteCard = useCallback(
    (e) => {
      e.preventDefault();
      deleteCardById(cardId)
        .then(() => setType(null))
        .catch((error) => {
          console.log("Ошибка при удалении", error);
        });
    },
    [deleteCardById, cardId]
  );
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonTitle="Да"
      onSubmit={deleteCard}
    ></PopupWithForm>
  );
};
export default PopupConfirm;
