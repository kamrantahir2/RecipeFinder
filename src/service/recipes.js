import axios from "axios";

// &to=100 Add this to baseUrl for 100 recipes
const baseUrl = `https://api.edamam.com/search?app_id=${
  import.meta.env.VITE_APP_ID
}&app_key=${import.meta.env.VITE_APP_KEY}&to=100`;

const getRecipes = async (query) => {
  const response = await axios.get(`${baseUrl}&q=${query}`);
  return response.data;
};

export default { getRecipes };
