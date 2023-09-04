import React, { useState, createContext } from "react";

export const ArticlesContext = createContext();

export const ArticlesContextProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  return (
    <ArticlesContext.Provider value={{ articles, setArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};
