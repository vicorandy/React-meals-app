import { useGlobalContext } from "../Context";

const Favorite = () => {
  const { favorites, selectMeal, removeFromFavorite } = useGlobalContext();
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favorites.map((meal) => {
            const { idMeal, strMealThumb: image } = meal;
            return (
              <div key={idMeal} className="favorite-item">
                <img
                  src={image}
                  alt=""
                  className="favorites-img img"
                  onClick={() => selectMeal(idMeal, true)}
                />
                <button
                  className="remove-btn"
                  onClick={() => removeFromFavorite(idMeal)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Favorite;
