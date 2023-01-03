import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      if (error.name === "AxiosError") setMeals("AxiosError");
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchData(randomMealUrl);
  };

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavorite = (idMeal) => {
    const isFavourite = favorites.find((meal) => meal.idMeal === idMeal);
    if (isFavourite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);

    const updateFavorite = [...favorites, meal];
    setFavorites(updateFavorite);
    localStorage.setItem("favorites", JSON.stringify(updateFavorite));
  };

  const removeFromFavorite = (idMeal) => {
    const updateFavorite = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updateFavorite);
    localStorage.setItem("favorites", JSON.stringify(updateFavorite));
  };
  useEffect(() => {
    fetchData(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;
    fetchData(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);
  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectMeal,
        selectedMeal,
        closeModal,
        removeFromFavorite,
        addToFavorite,
        favorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
