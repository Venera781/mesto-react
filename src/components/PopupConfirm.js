import PopupWithForm from "./PopupWithForm";
import {useDeleteCard} from "../providers/CardsProvider";
import { useCallback } from "react";

const PopupConfirm = ({cardId}) => {
  const deleteCardById = useDeleteCard();
  const deleteCard = useCallback(() => {
    deleteCardById(cardId);
  }, [deleteCardById, cardId])
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
