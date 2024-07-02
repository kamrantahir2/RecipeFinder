import { useState, useEffect } from "react";
import recipeService from "./service/recipes.js";
import Pagination from "./components/Pagination.jsx";
import "./App.css";
import Recipe from "./components/Recipe.jsx";
import Hero from "./components/Hero.jsx";
import { Fade, Slide } from "react-awesome-reveal";
import SearchForm from "./components/SearchForm.jsx";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState([]);
  const [pageRecipes, setPageRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [cuisineType, setCuisineType] = useState("");
  const [searchesMade, setSearchesMade] = useState(false);
  let searchQuery = [];

  useEffect(() => {
    window.scroll(0, 0);
  }, [pageRecipes]);

  const pageLimit = 9;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    searchQuery.push(`&q=${searchInput}`);

    if (cuisineType !== "") {
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
    setSearchInput("");
    setSearchesMade(true);
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
      <Hero searchesMade={searchesMade} />
      {!searchesMade && (
        <Fade direction="up">
          <h3 className="mb-6 text-black text-xl border-2 lg:w-3/12 m-auto p-3 border-cyan-400 rounded-xl">
            Type in an ingredient or cuisine to start
          </h3>
        </Fade>
      )}

      {!searchesMade ? (
        <Fade direction="up" triggerOnce>
          <SearchForm
            handleSubmit={handleSubmit}
            setCuisineType={setCuisineType}
            setSearchInput={setSearchInput}
          />
        </Fade>
      ) : (
        <SearchForm
          handleSubmit={handleSubmit}
          setCuisineType={setCuisineType}
          setSearchInput={setSearchInput}
        />
      )}

      {noResults && (
        <div className="text-black mt-20 text-2xl">No search results</div>
      )}

      <Fade duration={1200} triggerOnce>
        <div className="flex flex-row flex-wrap w-full gap-5">
          {pageRecipes.map((recipe) => {
            return <Recipe recipe={recipe} key={recipe.recipe.uri} />;
          })}
        </div>
      </Fade>

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
