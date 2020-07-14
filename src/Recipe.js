import React from "react";
import style from "./recipe.module.css";

const Recipe = ({ title, calories, poster, ingredients, serving, link }) => {

  return (
    <div className={style.recipe}>
      <button className={style.title} onClick={()=>{window.open(link)}}>
        {title}
      </button>
      <p>Serving: {serving}</p>
      <p>Calories: {calories}</p>
      <img src={poster} alt="" />
      <h3>Items required:</h3>
      <dl>
        {ingredients.map((item) => (
          <dt>{item.text}</dt>
        ))}
      </dl>
    </div>
  );
};

export default Recipe;
