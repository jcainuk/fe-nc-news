import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import ArticleDetailPage from "./routes/ArticleDetailPage";
import TopicList from "./components/TopicList";
import TopicPage from "./routes/TopicPage";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/topics/:topicSlug" element={<TopicPage />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
