// import axios from "axios";

// // Backend sets an httpOnly "token" cookie on /login and reads it back via
// // cookie-parser in every protected route. withCredentials is required so the
// // browser attaches/stores that cookie on cross-origin requests.
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;