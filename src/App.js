import React, { useState, lazy, Suspense } from "react";
import axios from "axios";
const Recipe = lazy(() => import("./Recipe"));

function App() {
  const API_ID = "794efe47";
  const API_KEY = "8fe74bbd4013ea59b1eb3b0d397b3925";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const getRecipes = async () => {
    const response = await axios(
      `https://api.edamam.com/search?q=${search}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    const data = await response.data;
    setRecipes(data.hits);
  };

  const getSearch = (event) => {
    event.preventDefault();
    getRecipes();
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
            onChange={event => setSearch(event.target.value)}
          />
          <button className="btn" type="submit">
            search
          </button>
        </form>
      </header>

      <div className="recipes">
        {recipes.map((recipe) => (
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        ))}
      </div>
    </div>
  );
}

export default App;
