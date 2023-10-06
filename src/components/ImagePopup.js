const ImagePopup = ({ title, link }) => {
  return (
    <>
      <img className="popup__image" src={link} alt={title} />
      <h2 className="popup__title">{title}</h2>
    </>
  );
};
export default ImagePopup;
