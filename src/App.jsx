import { useState, useEffect } from "react";
import recipeService from "./service/recipes.js";

import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await recipeService.getRecipes(searchInput);
    setResult(response.hits);
  };

  console.log(result);

  return (
    <>
      <div className="Search">
        <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="result">
        {result.map((r) => {
          return (
            <div key={r.recipe.uri}>
              <p>{r.recipe.label}</p>
              <p>
                ingredients:{" "}
                {r.recipe.ingredientLines.map((i) => {
                  return <div key={i}>{i}</div>;
                })}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
