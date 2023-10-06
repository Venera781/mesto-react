import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../src/utils/Api";

const CardsContext = createContext(null);
const CardsSetContext = createContext(null);
export const useCards = () => {
  return useContext(CardsContext);
};
export const useDeleteCard = () => {
  const setCards = useContext(CardsSetContext);
  return useCallback(
    (id) => {
      api
        .deleteCard(id)
        .then(() => {
          setCards((oldCards) => {
            return oldCards.filter((card) => {
              return card._id !== id;
            });
          });
        })
        .catch((error) => {
          console.log("Ошибка при удалении", error);
        });
    },
    [setCards]
  );
};

export const useLikeCard = () => {
  const setCards = useContext(CardsSetContext);
  return useCallback(
    (id, alreadyLiked) => {
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
    },
    [setCards]
  );
};

const CardsProvider = ({ children }) => {
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

  return (
    <CardsContext.Provider value={cards}>
      <CardsSetContext.Provider value={setCards}>
        {children}
      </CardsSetContext.Provider>
    </CardsContext.Provider>
  );
};
export default CardsProvider;
