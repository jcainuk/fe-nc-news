import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ArticleList from "../components/ArticleList";
import NavigationBar from "../components/NavigationBar";
import ArticleSortControls from "../components/ArticleSortControls";
import ArticleFinder from "../apis/ArticleFinder";

const TopicPage = () => {
  const { topicSlug } = useParams();
  const [topicArticles, setTopicArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    sortBy: "created_at",
    sortOrder: "desc"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArticleFinder.get(
          `/articles?topic=${topicSlug}`,
          {
            params: sortOptions // Pass sortOptions as query parameters
          }
        );
        setTopicArticles(response.data.articles);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        setIsError(true);
      }
    };
    fetchData();
  }, [topicSlug, sortOptions]);

  const handleSortChange = (sortBy, sortOrder) => {
    setSortOptions({ sortBy, sortOrder });
  };

  return (
    <div>
      <NavigationBar />
      <Header />
      <div className="container mt-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>An error occurred while fetching data.</p>
        ) : (
          <div>
            <h2>Topic: {topicSlug}</h2>
            <ArticleSortControls
              onSortChange={handleSortChange}
              sortOptions={sortOptions}
            />
            <ArticleList topicSlug={topicSlug} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
