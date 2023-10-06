import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
import Cards from "./Cards";
import Popup from "./Popup";
import ProfileProvider from "../providers/ProfileProvider";
import CardsProvider from "../providers/CardsProvider";
import PopupProvider from "../providers/PopupProvider";
import PopupEditProfile from "./PopupEditProfile";
import PopupEditAvatar from "./PopupEditAvatar";
import PopupConfirm from "./PopupConfirm";
import PopupAddImage from "./PopupAddImage";
import ImagePopup from "./ImagePopup";
import Main from "./Main";

function App() {
  return (
    <ProfileProvider>
      <CardsProvider>
        <PopupProvider>
          <div className="page__content">
            <Header />
            {/* компонент вынуждено создан так как автотест Практикума требует наличие компонента Main */}
            <Main>
              <Profile />
              <Cards />
              <Popup>
                <PopupEditProfile />
                <PopupEditAvatar />
                <PopupAddImage />
                <PopupConfirm />
                <ImagePopup />
              </Popup>
            </Main>
            <Footer />
          </div>
        </PopupProvider>
      </CardsProvider>
    </ProfileProvider>
  );
}

export default App;
