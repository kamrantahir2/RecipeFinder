import { useState, useEffect } from "react";
import recipeService from "./service/recipes.js";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    recipeService.getRecipes().then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <>
      <div>test</div>
    </>
  );
}

export default App;
