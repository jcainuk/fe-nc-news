import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ArticleList from "../components/ArticleList";
import ArticleFinder from "../apis/ArticleFinder";
import NavigationBar from "../components/NavigationBar";
import ArticleSortControls from "../components/ArticleSortControls";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    sortBy: "",
    sortOrder: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArticleFinder.get("/articles", {
          params: sortOptions
        });
        setArticles(response.data.articles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [sortOptions]);

  const handleSortChange = (sortBy, sortOrder) => {
    setSortOptions({ sortBy, sortOrder });
  };

  return (
    <div>
      <NavigationBar />
      <Header />
      <ArticleSortControls
        onSortChange={handleSortChange}
        sortOptions={sortOptions}
      />
      <ArticleList
        articles={articles}
        setArticles={setArticles}
        sortOptions={sortOptions}
      />
    </div>
  );
};

export default Home;
