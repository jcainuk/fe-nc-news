import React, { useEffect, useContext } from "react";
import ArticleFinder from "../apis/ArticleFinder";
import { ArticlesContext } from "../context/ArticlesContext";
import convertDate from "../utils/UKDateConverter";

const ArticleList = (props) => {
  const { articles, setArticles } = useContext(ArticlesContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArticleFinder.get("/");
        setArticles(response.data.articles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      {articles &&
        articles.map((article) => {
          return (
            <div key={article.article_id} className="col-md-4 mb-4">
              <div className="card d-flex flex-column h-100">
                <img
                  src={article.article_img_url}
                  className="card-img-top"
                  alt={article.title}
                />
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">Topic: {article.topic}</p>
                  <p className="card-text">Author: {article.author}</p>
                  <p className="card-text">
                    Date Created: {convertDate(article.created_at)}
                  </p>
                  <p className="card-text">Comments: {article.comment_count}</p>
                  <p className="card-text">Votes: {article.votes}</p>
                  <button className="btn btn-warning mt-auto">
                    View article
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ArticleList;
