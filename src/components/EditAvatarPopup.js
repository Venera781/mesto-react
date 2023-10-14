import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useUpdateAvatar, useProfile } from "../contexts/CurrentUserContext";
import { useSetPopup } from "../contexts/PopupProvider";

const EditAvatarPopup = () => {
  const currentUser = useProfile();
  const { isUpdating, updateAvatar } = useUpdateAvatar();
  const linkInput = useRef();
  const setType = useSetPopup();

  useEffect(() => {
    if (!linkInput.current) {
      return;
    }
    linkInput.current.value = currentUser.avatar;
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    updateAvatar(linkInput.current.value)
    .then(() => setType(null))
    .catch((error) => {
      console.log("Ошибка при отправке аватара", error);
    })
  }
  return (
    <PopupWithForm
      name="update"
      title="Обновить аватар"
      buttonTitle={isUpdating ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="url"
        id="avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        ref={linkInput}
      />
      <span className="avatar-error popup__input-error popup__input-error_last"></span>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
