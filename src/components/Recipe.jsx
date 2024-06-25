const Recipe = ({ recipe }) => {
  return (
    <div className=" card mx-2 bg-gray-50 capitalize text-black shadow-2xl my-7 p-2">
      <div className="">
        <h2 className="m-auto lg:text-2xl mt-8 ">{recipe.recipe.label}</h2>
        <h2 className="mb-3 text-sm mt-4">{recipe.recipe.cuisineType}</h2>
      </div>
      <figure className="">
        <img
          src={recipe.recipe.image}
          className=" w-10/12 lg:w-9/12 rounded-xl"
          alt={recipe.recipe.label}
        />
      </figure>

      <div className=" mt-3 md:mt-0 md:card-body">
        <a href={recipe.recipe.url} target="_blank">
          <button className="btn btn-primary mb-6 text-white lg:text-lg lg:h-14 lg:w-9/12 ">
            Find out more
          </button>
        </a>
      </div>
    </div>
  );
};

export default Recipe;
