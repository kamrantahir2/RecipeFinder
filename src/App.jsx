import { useState, useEffect } from "react";
import recipeService from "./service/recipes.js";
import Pagination from "./components/Pagination.jsx";
import "./App.css";
import Recipe from "./components/Recipe.jsx";
import Hero from "./components/Hero.jsx";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState([]);
  const [pageRecipes, setPageRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const pageLimit = 9;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await recipeService.getRecipes(searchInput);
    setLoading(false);
    setResult(response.hits);
    setPageRecipes(response.hits.slice(0, pageLimit));
    setSearchInput("");
    if (response.hits.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Hero />
        <span className="loading loading-spinner text-success loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="font-playwrite">
      <Hero />
      <form onSubmit={handleSubmit} className="Search mt-2 md:mt-0">
        <input
          className="input bg-white mr-3 border-2 border-black text-black"
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="text-white mt-4 md:mt-0" type="submit">
          Submit
        </button>
      </form>

      {noResults && (
        <div className="text-black mt-20 text-2xl">No search results</div>
      )}

      <div className="lg:w-full m-auto md:grid md:grid-cols-2 lg:grid-cols-3 mt-20 text-black ">
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
