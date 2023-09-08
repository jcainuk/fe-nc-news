import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";

import ArticleFinder from "../apis/ArticleFinder";

const TopicPage = () => {
  const navigateTo = useNavigate();
  const { topicSlug } = useParams();
  const [topicArticles, setTopicArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchArticlesByTopic = async () => {
    try {
      const response = await ArticleFinder.get(`/articles?topic=${topicSlug}`);
      setTopicArticles(response.data.articles);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchArticlesByTopic();
  }, [topicSlug]);

  const handleArticleSelect = (id) => {
    navigateTo(`/articles/${id}`);
  };

  return (
    <div>
      <NavigationBar />
      <Header />
      <div className="container mt-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Topic not found</p>
        ) : (
          <div className="row">
            <h2>Topic: {topicSlug}</h2>
            {topicArticles.map((article) => (
              <div key={article.article_id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={article.article_img_url}
                    className="card-img-top img-fluid"
                    alt={article.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">Topic: {article.topic}</p>
                    <p className="card-text">Author: {article.author}</p>
                    <p className="card-text">
                      Date Created:{" "}
                      {new Date(article.created_at).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                      Comments: {article.comment_count}
                    </p>
                    <p className="card-text">Votes: {article.votes}</p>
                  </div>
                  <div className="card-footer text-center">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleArticleSelect(article.article_id)}
                    >
                      View Article
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
