import axios from "axios";
import { AXIOS_OPTION, API_URL } from "src/config";

// GET ALL CATEGORIES
export const httpGetCategories = async (isCategoryLoading) => {
  try {
    // Set Loading to true
    isCategoryLoading(true);

    // Make axios get request to category
    const response = await axios.get(`${API_URL}/categories`);
    // Set Loading to false
    isCategoryLoading(false);
    return response.data.data;
  } catch (error) {
    // Set Loading to true
    isCategoryLoading(true);

    console.log(error);
  }
};

// GET ALL TAGS
export const httpGetTags = async (setIsTagLoading) => {
  try {
    // Set Loading to true
    setIsTagLoading(true);

    // Make axios get request to category
    const response = await axios.get(`${API_URL}/tags`);
    // Set Loading to false
    setIsTagLoading(false);
    return response.data.data;
  } catch (error) {
    // Set Loading to true
    setIsTagLoading(true);

    console.log(error);
  }
};
