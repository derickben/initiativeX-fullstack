import { useCallback, useEffect, useState } from "react";

import { httpGetTags } from "src/requests/categoryAndTag.request";

function useTags() {
  const [tags, saveTags] = useState([]);
  const [isTagLoading, setIsTagLoading] = useState(false);

  const getAllTags = useCallback(async () => {
    const fetchedTags = await httpGetTags(setIsTagLoading);
    saveTags(fetchedTags);
  }, []);

  useEffect(() => {
    getAllTags();
  }, [getAllTags]);

  return { tags, isTagLoading };
}

export default useTags;
