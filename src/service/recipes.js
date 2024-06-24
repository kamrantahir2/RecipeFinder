import axios from "axios";

const baseUrl = `https://api.edamam.com/search?app_id=${
  import.meta.env.VITE_APP_ID
}&app_key=${import.meta.env.VITE_APP_KEY}&to=100`;

const getRecipes = async (queryArray) => {
  let searchUrl = baseUrl;

  for (let i = 0; i < queryArray.length; i++) {
    searchUrl += queryArray[i];
  }

  const response = await axios.get(searchUrl);

  return response.data;
};

export default { getRecipes };
