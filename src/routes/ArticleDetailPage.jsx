import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleFinder from "../apis/ArticleFinder";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArticleFinder.get(`/articles/${id}`);
        setSelectedArticle(response.data.article);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container mt-4">
      {selectedArticle && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card">
              <img
                src={selectedArticle.article_img_url}
                className="card-img-top"
                alt={selectedArticle.title}
              />
              <div className="card-body">
                <h5 className="card-title">{selectedArticle.title}</h5>
                <p className="card-text">Topic: {selectedArticle.topic}</p>
                <p className="card-text">Author: {selectedArticle.author}</p>
                <p className="card-text">{selectedArticle.body}</p>
                <p className="card-text">
                  Date Created:{" "}
                  {new Date(selectedArticle.created_at).toLocaleDateString()}
                </p>
                <p className="card-text">Votes: {selectedArticle.votes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetailPage;
