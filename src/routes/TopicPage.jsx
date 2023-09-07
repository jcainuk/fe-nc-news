import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ArticleFinder from "../apis/ArticleFinder";
import ArticleList from "../components/ArticleList";
import NavigationBar from "../components/NavigationBar";

const TopicPage = () => {
  const { topicSlug } = useParams();
  const [topicArticles, setTopicArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  console.log(topicSlug, "topic slug");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArticleFinder.get(
          `/articles?topic=${topicSlug}`
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
  }, [topicSlug]);

  console.log("topicArticles:", topicArticles);
  console.log("topicSlug:", topicSlug);

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
            <ArticleList topicSlug={topicSlug} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
