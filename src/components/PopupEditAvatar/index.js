import PopupWithForm from "../PopupWithForm";

const PopupEditAvatar = () => {
  return (
    <PopupWithForm
      name="update"
      title="Обновить аватар"
      buttonTitle="Сохранить"
    >
      <input
        className="popup__input"
        type="url"
        id="avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        value=""
        required
      />
      <span className="avatar-error popup__input-error popup__input-error_last"></span>
    </PopupWithForm>
  );
};
export default PopupEditAvatar;
