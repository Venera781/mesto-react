import { useCallback, useContext, useMemo } from "react";
import cx from "../utils/cx";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = ({ onCardLike, onDeleteClick, onOpenCard, data }) => {
  const currentUser = useContext(CurrentUserContext);

  const handleDeleteClick = useCallback(() => {
    onDeleteClick(data._id);
  }, [data, onDeleteClick]);

  const openCard = useCallback(() => {
    onOpenCard({ title: data.name, link: data.link });
  }, [onOpenCard, data]);

  const cardCreatedByMe = data.owner._id === currentUser.id;
  const cardLikedByMe = useMemo(() => {
    return data.likes.some((el) => el._id === currentUser.id);
  }, [data, currentUser]);

  const handleCardLikeClick = useCallback(() => {
    onCardLike(data._id, cardLikedByMe);
  }, [onCardLike, data, cardLikedByMe]);

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
        onClick={handleDeleteClick}
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
            onClick={handleCardLikeClick}
          ></button>
          <p className="element__icon-like">{data.likes.length}</p>
        </div>
      </div>
    </article>
  );
};
export default Card;
