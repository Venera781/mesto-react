import Card from "./Card";
import { useCards } from "../contexts/CardsProvider";

const Cards = () => {
  const elements = useCards();
  return (
    <section className="elements">
      {elements.map((element) => (
        <Card key={element._id} data={element} />
      ))}
    </section>
  );
};
export default Cards;
