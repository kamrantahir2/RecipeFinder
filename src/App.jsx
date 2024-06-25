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
  const [cuisineType, setCuisineType] = useState("");
  let searchQuery = [];
  let cuisineChanged = false;

  useEffect(() => {
    window.scroll(0, 0);
  }, [pageRecipes]);

  const pageLimit = 9;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    searchQuery.push(`&q=${searchInput}`);

    if (cuisineType !== "") {
      cuisineChanged = true;
    }

    if (cuisineChanged) {
      searchQuery.push(`&cuisineType=${cuisineType}`);
    }

    const response = await recipeService.getRecipes(searchQuery);
    setLoading(false);
    setResult(response.hits);
    setPageRecipes(response.hits.slice(0, pageLimit));
    if (response.hits.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    searchQuery = [];
    setCuisineType("");
    cuisineChanged = false;
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
        <div>
          <input
            className="input bg-white border-2 border-black text-black"
            type="text"
            placeholder="Ingredients"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="bg-white input border-2 mt-3 border-black  m-auto text-black"
            placeholder="Cuisine"
            onChange={(e) => setCuisineType(e.target.value)}
          />
        </div>
        <button className="text-white mt-4 md:mt-3 block m-auto" type="submit">
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
