import { useState, useEffect } from "react";
import recipeService from "./service/recipes.js";

import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await recipeService.getRecipes(searchInput);
    console.log(response.hits);
    setResult(response.hits);
  };

  return (
    <>
      <div className="Search bg-white">
        <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
        <button className="" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <h1 className="text-red-900 underline">test</h1>

      <div className="result">
        {result.map((r) => {
          return (
            <div key={r.recipe.uri}>
              <p>{r.recipe.label}</p>
              <div>
                ingredients:{" "}
                {r.recipe.ingredientLines.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
