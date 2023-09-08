import React, { useState, useContext } from "react";
import ArticleFinder from "../apis/ArticleFinder";
import { UserContext } from "../contexts/UserProvider";

const CommentForm = ({ id, onCommentSubmit }) => {
  const { user: loggedInUser } = useContext(UserContext);
  const [commentData, setCommentData] = useState({
    username: loggedInUser,
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
      alert("Username and comment body are required.");
      return;
    }

    setIsLoading(true);

    try {
      if (!navigator.onLine) {
        alert(
          "You are offline. Please check your internet connection and try again."
        );
      }

      const response = await ArticleFinder.post(`/articles/${id}/comments`, {
        username,
        body
      });

      onCommentSubmit(response.data.comment);

      setCommentData({
        username: loggedInUser, // Reset the username to the loggedInUser value
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
            placeholder={`Username: ${loggedInUser} (Logged In)`}
            name="username"
            value={commentData.username}
            onChange={handleInputChange}
            disabled
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
