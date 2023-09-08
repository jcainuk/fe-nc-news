import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ArticleList from "../components/ArticleList";
import ArticleFinder from "../apis/ArticleFinder";
import NavigationBar from "../components/NavigationBar";
import ArticleSortControls from "../components/ArticleSortControls";
import { useSearchParams, useNavigate } from "react-router-dom";

const Home = () => {
  const navigateTo = useNavigate();
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {};

        if (sortBy) {
          params.sort_by = sortBy;
        }

        if (sortOrder) {
          params.order = sortOrder;
        }
        const response = await ArticleFinder.get("/articles", {
          params
        });
        setArticles(response.data.articles);
        console.log(
          "API request with sortBy:",
          sortBy,
          "and sortOrder:",
          sortOrder
        );
      } catch (err) {
        console.log(err);
      }
    };

    const initialSortBy = searchParams.get("sort_by");
    const initialSortOrder = searchParams.get("order");

    setSortBy(initialSortBy || "");
    setSortOrder(initialSortOrder || "");

    fetchData();
  }, []);

  const handleSortChange = (name, value) => {
    if (name === "sortBy") {
      setSortBy(value);
    } else if (name === "sortOrder") {
      setSortOrder(value);
    }
    console.log("handleSortChange called");
  };

  const handleApplyFilters = async () => {
    console.log("handleApplyFilters called");
    try {
      const response = await ArticleFinder.get("/articles", {
        params: {
          sort_by: sortBy,
          order: sortOrder
        }
      });
      setArticles(response.data.articles);
      console.log("handleApplyFilters called");
      setSearchParams({
        sort_by: sortBy,
        order: sortOrder
      });
      navigateTo(`/?sort_by=${sortBy}&order=${sortOrder}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleResetFilters = async () => {
    try {
      setSortBy("");
      setSortOrder("");

      setSearchParams({});

      const response = await ArticleFinder.get("/articles");
      setArticles(response.data.articles);
      navigateTo(`/?sort_by=${sortBy}&order=${sortOrder}`);
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
      <ArticleList articles={articles} sortOptions={{ sortBy, sortOrder }} />
    </div>
  );
};

export default Home;
