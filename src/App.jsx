import { useState, useEffect } from "react";
import recipeService from "./service/recipes.js";
import Pagination from "./components/Pagination.jsx";
import "./App.css";
import Recipe from "./components/Recipe.jsx";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState([]);
  const [pageRecipes, setPageRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const pageLimit = 9;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await recipeService.getRecipes(searchInput);
    setLoading(false);
    setResult(response.hits);
    setPageRecipes(response.hits.slice(0, pageLimit));
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="font-playwrite">
      <form onSubmit={handleSubmit} className="Search ">
        <input
          className="input bg-white mr-3 border-2 border-black text-black"
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="text-white " type="submit">
          Submit
        </button>
      </form>

      <div className="w-9/12 md:w-full m-auto md:grid md:grid-cols-2 lg:grid-cols-3 mt-20 text-black ">
        {pageRecipes.map((recipe) => {
          return (
            <div key={recipe.recipe.uri}>
              <Recipe recipe={recipe} />
            </div>
          );
        })}
      </div>

      {result.length !== 0 && (
        <Pagination
          items={result}
          pageLimit={pageLimit}
          setPageItems={setPageRecipes}
        />
      )}
    </div>
  );
}

export default App;
