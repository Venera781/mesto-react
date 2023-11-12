import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
import Cards from "./Cards";
import { CardsContext } from "../contexts/CardsContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupConfirm from "./PopupConfirm";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { useCallback, useEffect, useState, useRef } from "react";
import api from "../utils/Api";

function App() {
  //Методы для работы с данными пользователя
  const [currentUser, setCurrentUser] = useState(() => {
    return {
      avatar: "",
      name: "",
      about: "",
      id: "",
    };
  });

  useEffect(() => {
    api
      .getInfoUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log("Ошибка при загрузке", error);
      });
  }, []);

  const handleUpdateUser = useCallback((name, about) => {
    return api.editProfile(name, about).then((data) => {
      setCurrentUser(data);
    });
  }, []);

  const handleUpdateAvatar = useCallback((avatarLink) => {
    return api.updateAvatar(avatarLink).then((data) => {
      setCurrentUser(data);
    });
  }, []);

  //Методы для работы с карточками
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        data.reverse();
        setCards(data);
      })
      .catch((error) => {
        console.log("Ошибка при загрузке", error);
      });
  }, []);

  const deleteId = useRef();
  const handleCardDelete = useCallback(() => {
    const id = deleteId.current;
    return api.deleteCard(id).then(() => {
      setCards((oldCards) => {
        return oldCards.filter((card) => {
          return card._id !== id;
        });
      });
    });
  }, []);

  const handleAddPlaceSubmit = useCallback((placename, link) => {
    return api.addCard(placename, link).then((newCardData) => {
      setCards((oldCards) => {
        return [newCardData, ...oldCards];
      });
    });
  }, []);

  const handleCardLike = useCallback((id, alreadyLiked) => {
    api
      .toggleLikes(id, alreadyLiked)
      .then((data) => {
        setCards((oldCards) => {
          return oldCards.map((card) => {
            if (card._id === id) {
              return data;
            }
            return card;
          });
        });
      })
      .catch((error) => {
        console.log("Ошибка при удалении", error);
      });
  }, []);

  //Методы для работы с Popup
  const [popup, setPopup] = useState(null);

  const handleDeleteClick = useCallback((id) => {
    deleteId.current = id;
    setPopup("confirm");
  }, []);

  const openedCardData = useRef();
  const handleOpenCard = useCallback((data) => {
    openedCardData.current = data;
    setPopup("element");
  }, []);
  const handleClose = useCallback(() => {
    setPopup(null);
  }, []);

  const handleEditProfile = useCallback(() => {
    setPopup("profile");
  }, []);

  const handleEditAvatar = useCallback(() => {
    setPopup("update");
  }, []);

  const handleOpenAddImage = useCallback(() => {
    setPopup("addimage");
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page__content">
          <Header />
          {/* компонент вынуждено создан так как автотест Практикума требует наличие компонента Main */}
          <Main>
            <Profile
              onEditProfile={handleEditProfile}
              onEditAvatar={handleEditAvatar}
              onOpenAddImage={handleOpenAddImage}
            />
            <Cards
              onCardLike={handleCardLike}
              onDeleteClick={handleDeleteClick}
              onOpenCard={handleOpenCard}
            />
            <EditProfilePopup
              onUpdateUser={handleUpdateUser}
              isOpen={popup === "profile"}
              onClose={handleClose}
            />
            <EditAvatarPopup
              onUpdateAvatar={handleUpdateAvatar}
              isOpen={popup === "update"}
              onClose={handleClose}
            />
            <AddPlacePopup
              onAddPlace={handleAddPlaceSubmit}
              isOpen={popup === "addimage"}
              onClose={handleClose}
            />
            <PopupConfirm
              onCardDelete={handleCardDelete}
              isOpen={popup === "confirm"}
              onClose={handleClose}
            />
            <ImagePopup
              isOpen={popup === "element"}
              onClose={handleClose}
              data={openedCardData.current}
            />
          </Main>
          <Footer />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
