import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleFinder from "../apis/ArticleFinder";

const ArticleList = ({ topicSlug, sortOptions }) => {
  const navigateTo = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { sortBy, sortOrder } = sortOptions;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (topicSlug) {
          response = await ArticleFinder.get(`/articles?topic=${topicSlug}`, {
            params: sortOptions
          });
        } else {
          response = await ArticleFinder.get("/articles", {
            params: sortOptions
          });
        }
        setArticles(response.data.articles);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        setIsError(true);
      }
    };

    console.log("sortOptions:", sortOptions);
    fetchData();
  }, [topicSlug, sortOptions]);

  const handleArticleSelect = (id) => {
    navigateTo(`/articles/${id}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred while fetching data.</p>;
  }

  return (
    <div className="row">
      {articles.map((article) => (
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
              <p className="card-text">Comments: {article.comment_count}</p>
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
  );
};

export default ArticleList;
