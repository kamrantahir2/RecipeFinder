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
        {pageRecipes.map((r) => {
          return (
            <div
              className=" card mx-2 bg-gray-50 capitalize text-black shadow-2xl my-7 "
              key={r.recipe.uri}
            >
              <div className="">
                <h2 className="m-auto lg:text-2xl mt-8 ">{r.recipe.label}</h2>
                <h2 className="mb-3 text-sm mt-4">{r.recipe.cuisineType}</h2>
              </div>
              <figure className="">
                <img
                  src={r.recipe.image}
                  className=" w-10/12 lg:w-9/12 rounded-xl"
                  alt={r.recipe.label}
                />
              </figure>

              <div className=" mt-3 md:mt-0 md:card-body"></div>
              <a href={r.recipe.url} target="_blank">
                <button className="btn btn-primary mb-6 text-white lg:text-lg lg:h-14 lg:w-9/12 ">
                  Find out more
                </button>
              </a>
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
