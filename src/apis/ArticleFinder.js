import axios from "axios";

export default axios.create({
  baseURL: "https://nc-news-ry7t.onrender.com/api"
  //baseURL: "http://localhost:9090/api"
});
