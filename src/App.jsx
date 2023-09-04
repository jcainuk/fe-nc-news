import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import ArticleDetailPage from "./routes/ArticleDetailPage";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/articles/:id" element={<ArticleDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
