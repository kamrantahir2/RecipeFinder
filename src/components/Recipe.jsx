const Recipe = ({ recipe }) => {
  return (
    <div className=" card mx-2 bg-gray-50 capitalize text-black shadow-2xl my-7 p-2 w-full lg:w-3/12 flex-grow">
      <div className="">
        <h2 className=" lg:text-2xl mt-8 ">{recipe.recipe.label}</h2>
      </div>

      <div className=" mt-3 md:mt-0 md:card-body">
        <h2 className="mb-3 text-sm mt-auto">{recipe.recipe.cuisineType}</h2>
        <figure className="">
          <img
            src={recipe.recipe.image}
            className=" w-10/12 lg:w-9/12 md:mt-3 rounded-xl"
            alt={recipe.recipe.label}
          />
        </figure>
        <a href={recipe.recipe.url} target="_blank" className="">
          <button className="btn btn-primary mt-4 mb-6 text-white lg:text-lg lg:h-14 lg:w-9/12 ">
            Find out more
          </button>
        </a>
      </div>
    </div>
  );
};

export default Recipe;
