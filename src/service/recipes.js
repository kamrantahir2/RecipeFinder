import axios from "axios";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${
  import.meta.env.VITE_APP_ID
}&app_key=${
  import.meta.env.VITE_APP_KEY
}&field=uri&field=image&field=url&field=label&field=ingredientLines&field=mealType&field=dishType&field=yield&field=calories`;

const getRecipes = async (query) => {
  const response = await axios.get(`${baseUrl}&q=${query}`);

  return response.data;
};

export default { getRecipes };
