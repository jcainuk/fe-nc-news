import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleFinder from "../apis/ArticleFinder";
import Header from "./Header";

const TopicList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArticleFinder.get("/topics");
        setTopics(response.data.topics);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;
