import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
import Cards from "./Cards";
import Popup from "./Popup";
import CardsProvider from "../contexts/CardsProvider";
import PopupProvider from "../contexts/PopupProvider";
import CurrentUserProvider from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupConfirm from "./PopupConfirm";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Main from "./Main";

function App() {
  return (
    <CurrentUserProvider>
      <CardsProvider>
        <PopupProvider>
          <div className="page__content">
            <Header />
            {/* компонент вынуждено создан так как автотест Практикума требует наличие компонента Main */}
            <Main>
              <Profile />
              <Cards />
              <Popup>
                <EditProfilePopup />
                <EditAvatarPopup />
                <AddPlacePopup />
                <PopupConfirm />
                <ImagePopup />
              </Popup>
            </Main>
            <Footer />
          </div>
        </PopupProvider>
      </CardsProvider>
    </CurrentUserProvider>
  );
}

export default App;
