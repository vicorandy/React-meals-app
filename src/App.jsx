import "./App.css";
import Meals from "./Components/Meals";
import Search from "./Components/Search";
import Modal from "./Components/Modal";
import { useGlobalContext } from "./Context";
import Favorite from "./Components/Favorites";

function App() {
  const { showModal, favorites } = useGlobalContext();

  return (
    <main>
      Meals application
      <Search />
      {favorites.length < 1 ? "" : <Favorite />}
      <Meals />
      {showModal ? <Modal /> : ""}
    </main>
  );
}

export default App;
