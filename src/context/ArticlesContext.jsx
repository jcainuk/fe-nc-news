import React, { useState, createContext } from "react";

export const ArticlesContext = createContext();

export const ArticlesContextProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <ArticlesContext.Provider
      value={{ articles, setArticles, selectedArticle, setSelectedArticle }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};
