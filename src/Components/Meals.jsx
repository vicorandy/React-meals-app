import { useGlobalContext } from "../Context";
import { BsHandThumbsUp } from "react-icons/bs";

const Meals = () => {
  const { meals, loading, selectMeal, addToFavorite, favorites } =
    useGlobalContext();

  const displayModal = (e) => {
    selectMeal(e.target.id);
  };

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again</h4>
      </section>
    );
  }
  if (meals === "AxiosError") {
    return (
      <section className="section">
        <h4>
          you seem to be having network issues please check your internet
          connection and try again
        </h4>
      </section>
    );
  }
  if (!loading) {
    return (
      <section className="section-center">
        {meals.map((meal) => {
          const { idMeal, strMeal: title, strMealThumb: image } = meal;
          return (
            <article key={idMeal} className="single-meal">
              <img
                src={image}
                alt={title}
                className="img"
                onClick={displayModal}
                id={idMeal}
              />
              <footer>
                <h5>{title}</h5>
                <button
                  className="like-btn"
                  onClick={() => {
                    addToFavorite(idMeal);
                  }}
                >
                  <BsHandThumbsUp />
                </button>
              </footer>
            </article>
          );
        })}
      </section>
    );
  }
};
export default Meals;
