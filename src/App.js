import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import axios from "axios";

function App() {
  const API_ID = "794efe47";
  const API_KEY = "8fe74bbd4013ea59b1eb3b0d397b3925";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await axios(
      `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    const data = await response.data;
    setRecipes(data.hits);
  };

  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  const getSearch = (event) => {
    event.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Recipe Search</h1>
        <form onSubmit={getSearch} className="search-form">
          <input
            className="input"
            type="text"
            placeholder="Search for a recipe..."
            value={search}
            onChange={updateSearch}
          />
          <button className="btn" type="submit">
            search
          </button>
        </form>
      </header>

      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.image}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            poster={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            time={recipe.recipe.totalTime}
            serving={recipe.recipe.yield}
            link={recipe.recipe.url}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
