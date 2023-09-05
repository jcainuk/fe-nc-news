import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ArticleList from "../components/ArticleList";
import ArticleFinder from "../apis/ArticleFinder";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArticleFinder.get("/articles");
        setArticles(response.data.articles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <ArticleList articles={articles} setArticles={setArticles} />
    </div>
  );
};

export default Home;
