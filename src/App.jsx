import { useState, useEffect } from "react";
import recipeService from "./service/recipes.js";

import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await recipeService.getRecipes(searchInput);
    setResult(response);
  };

  console.log(result);

  return (
    <>
      <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default App;
