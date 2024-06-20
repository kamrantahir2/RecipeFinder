import { useState, useEffect } from "react";
import recipeService from "./service/recipes.js";
import Pagination from "./components/Pagination.jsx";
import "./App.css";
import usePagination from "./components/usePagination.js";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState([]);
  const [pageRecipes, setPageRecipes] = useState([]);

  const pageLimit = 9;

  // const { pageNumber, changePage, pageData, nextPage, previousPage } =
  //   usePagination(result, pageLimit);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await recipeService.getRecipes(searchInput);
    console.log(response.hits);
    setResult(response.hits);
  };

  return (
    <>
      <div className="Search ">
        <input
          className="input bg-white mr-3 text-black"
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div className="grid grid-cols-3 gap-9 mt-20 text-black">
        {pageRecipes.map((r) => {
          return (
            <div className="card bg-white shadow-xl" key={r.recipe.uri}>
              <div className="mt-7 m-auto">
                <img className="rounded-xl" src={r.recipe.image} alt="Food" />
              </div>

              <div className="card-body">
                <h2 className="card-title">{r.recipe.label}</h2>
                <ul>
                  <p>Ingredients: </p>
                  {r.recipe.ingredientLines.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="card-actions justify-end pr-4 pb-4">
                <a target="_blank" href={r.recipe.url}>
                  <button className="btn text-white btn-primary">
                    Get Recipe
                  </button>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        items={result}
        pageLimit={pageLimit}
        setPageItems={setPageRecipes}
      />
    </>
  );
}

export default App;
