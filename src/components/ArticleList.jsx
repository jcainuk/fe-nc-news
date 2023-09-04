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
    <div className="list-group">
      <table className="table table-hover table-light">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Title</th>
            <th scope="col">Topic</th>
            <th scope="col">Author</th>
            <th scope="col">Date Created</th>
            <th scope="col">Votes</th>
            <th scope="col">Click to View</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            return (
              <tr key={`${article.title}+${article.index}`}>
                <td>{article.title}</td>
                <td>{article.topic}</td>
                <td>{article.author}</td>
                <td>{convertDate(article.created_at)}</td>
                <td>{article.votes}</td>
                <td>
                  <button className="btn btn-warning">View article</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleList;
