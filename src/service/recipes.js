import axios from "axios";
const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
  import.meta.env.VITE_API_KEY
}`;

const getRecipes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getRecipes };
