import { useCallback, useEffect, useState } from "react";

import { httpGetCategories } from "src/requests/categoryAndTag.request";

function useCategories() {
  const [categories, saveCategories] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  const getAllCategories = useCallback(async () => {
    const fetchedCategories = await httpGetCategories(setIsCategoryLoading);
    saveCategories(fetchedCategories);
  }, []);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return { categories, isCategoryLoading };
}

export default useCategories;
