import { useState } from "react";
import { useGlobalContext } from "../Context";

const Search = () => {
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(text);
  };
  const handleRandomMeal = (e) => {
    e.preventDefault();
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
  };
  return (
    <header className="search-container">
      <form>
        <input
          type="text"
          className="form-input"
          placeholder="type favorite meal"
          onChange={handleChange}
          value={text}
        />
        <button className="btn" type="submit" onClick={handleSubmit}>
          Serach
        </button>
        <button
          className="btn btn-hipster"
          type="btn"
          onClick={handleRandomMeal}
        >
          suprise me
        </button>
      </form>
    </header>
  );
};
export default Search;
