export const API_URL = "http://localhost:5000/api";

// export const AXIOS_OPTION = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

export const AXIOS_OPTION = (type = "application/json") => {
  return {
    headers: {
      "Content-Type": type,
    },
  };
};
