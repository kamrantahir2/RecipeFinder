import { useState, useEffect } from "react";
import recipeService from "./service/recipes.js";
import Pagination from "./components/Pagination.jsx";
import "./App.css";

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
    <div className="">
      <form onSubmit={handleSubmit} className="Search ">
        <input
          className="input bg-white mr-3 border-2 border-black text-black"
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="grid grid-cols-3 mt-20 text-black ">
        {pageRecipes.map((r) => {
          return (
            <div
              className="card mx-2 bg-gray-50 capitalize text-black shadow-xl my-7 "
              key={r.recipe.uri}
            >
              <figure className="py-10">
                <img
                  src={r.recipe.image}
                  className=" w-9/12 rounded-xl"
                  alt="Album"
                />
              </figure>
              <h2 className="m-auto text-2xl">{r.recipe.label}</h2>
              <div className="card-body">
                <div>
                  <p>{r.recipe.yield} servings </p>
                </div>
                <div>
                  <p>
                    {Math.floor(r.recipe.calories / r.recipe.yield)}{" "}
                    kcal/serving
                  </p>
                </div>

                <a href={r.recipe.url} target="_blank">
                  <button className="btn btn-primary mt-5 text-white text-lg ">
                    Get Recipe
                  </button>
                </a>
              </div>
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
