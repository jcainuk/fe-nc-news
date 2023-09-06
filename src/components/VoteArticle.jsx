import React, { useState } from "react";
import ArticleFinder from "../apis/ArticleFinder";

const VoteArticle = ({ id, initialVoteCount }) => {
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [error, setError] = useState(false);

  const handleVote = async (incVotes) => {
    try {
      const updatedArticle = await ArticleFinder.patch(`/articles/${id}`, {
        inc_votes: incVotes
      });
      console.log(updatedArticle);

      setVoteCount(updatedArticle.data.votes);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-success me-2"
        onClick={() => handleVote(1)}
      >
        <i className="bi bi-hand-thumbs-up"></i> Vote Up
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => handleVote(-1)}
      >
        <i className="bi bi-hand-thumbs-down"></i> Vote Down
      </button>
      <p className="ms-3">Votes: {voteCount}</p>
      {error && (
        <p className="text-danger mt-3">Error occurred while voting.</p>
      )}
    </div>
  );
};

export default VoteArticle;
