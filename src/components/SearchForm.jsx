const SearchForm = ({ handleSubmit, setSearchInput, setCuisineType }) => {
  return (
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
  );
};

export default SearchForm;
