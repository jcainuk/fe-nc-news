import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ArticleList from "../components/ArticleList";
import ArticleFinder from "../apis/ArticleFinder";
import NavigationBar from "../components/NavigationBar";
import ArticleSortControls from "../components/ArticleSortControls";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArticleFinder.get("/articles", {
          params: {
            sort_by: sortBy,
            order: sortOrder
          }
        });
        setArticles(response.data.articles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [sortBy, sortOrder]);

  const handleSortChange = (name, value) => {
    if (name === "sortBy") {
      setSortBy(value);
    } else if (name === "sortOrder") {
      setSortOrder(value);
    }
  };

  const handleApplyFilters = async () => {
    try {
      const response = await ArticleFinder.get("/articles", {
        params: {
          sort_by: sortBy,
          order: sortOrder
        }
      });
      setArticles(response.data.articles);
    } catch (err) {
      console.log(err);
    }
  };

  const handleResetFilters = async () => {
    try {
      setSortBy("");
      setSortOrder("");

      const response = await ArticleFinder.get("/articles");
      setArticles(response.data.articles);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavigationBar />
      <Header />
      <ArticleSortControls
        onSortChange={handleSortChange}
        sortOptions={{ sortBy, sortOrder }}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />
      <ArticleList articles={articles} />
    </div>
  );
};

export default Home;
