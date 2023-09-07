import React, { useState } from "react";
import ArticleFinder from "../apis/ArticleFinder";

const CommentForm = ({ id, onCommentSubmit }) => {
  const [commentData, setCommentData] = useState({
    username: "",
    body: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, body } = commentData;

    if (!username || !body) {
      alert("Username and body are required.");
      return;
    }

    setIsLoading(true);

    try {
      const hardCodedUsername = "grumpy19";

      if (!navigator.onLine) {
        alert(
          "You are offline. Please check your internet connection and try again."
        );
      }

      const response = await ArticleFinder.post(`/articles/${id}/comments`, {
        username: hardCodedUsername,
        body
      });

      onCommentSubmit(response.data.comment);

      setCommentData({
        username: "",
        body: ""
      });
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h4>Add a Comment</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={commentData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Comment"
            name="body"
            value={commentData.body}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
