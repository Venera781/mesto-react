import { useCallback, useMemo } from "react";
import { useLikeCard } from "../contexts/CardsProvider";
import { useSetPopup } from "../contexts/PopupProvider";
import { useUserId } from "../contexts/CurrentUserContext";
import cx from "../utils/cx";

const Card = ({ data }) => {
  const setPopupType = useSetPopup();
  const deleteCard = useCallback(() => {
    setPopupType({ name: "confirm", cardId: data._id });
  }, [data, setPopupType]);

  const openCard = useCallback(() => {
    setPopupType({ name: "element", title: data.name, link: data.link });
  }, [setPopupType, data]);

  const likeCardById = useLikeCard();
  const userId = useUserId();

  const cardLikedByMe = useMemo(() => {
    return data.likes.some((el) => el._id === userId);
  }, [data, userId]);
  const cardCreatedByMe = data.owner._id === userId;
  const likeCard = useCallback(() => {
    likeCardById(data._id, cardLikedByMe);
  }, [data, likeCardById, cardLikedByMe]);

  return (
    <article className="element">
      <img
        className="element__image"
        src={data.link}
        alt={data.title}
        onClick={openCard}
      />
      <button
        className={cx(
          "element__icon-trash",
          cardCreatedByMe && "element__icon-trash_visible"
        )}
        type="button"
        aria-label="Удалить"
        onClick={deleteCard}
      ></button>
      <div className="element__wrapper-title">
        <h2 className="element__title">{data.name}</h2>
        <div className="element__wrapper-like">
          <button
            className={cx(
              "element__icon-heart",
              cardLikedByMe && "element__icon-heart_active"
            )}
            type="button"
            aria-label="Ставить лайк"
            onClick={likeCard}
          ></button>
          <p className="element__icon-like">{data.likes.length}</p>
        </div>
      </div>
    </article>
  );
};
export default Card;
