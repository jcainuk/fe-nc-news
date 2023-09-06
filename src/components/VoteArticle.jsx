import React, { useState } from "react";
import ArticleFinder from "../apis/ArticleFinder";

const VoteArticle = ({ id, initialVoteCount, voteCount, setVoteCount }) => {
  const [error, setError] = useState(false);

  const handleVote = async (incVotes) => {
    try {
      setVoteCount((currVotes) => currVotes + incVotes);

      const updatedArticle = await ArticleFinder.patch(`/articles/${id}`, {
        inc_votes: incVotes
      });

      if (updatedArticle.data && updatedArticle.data.article) {
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);

      setVoteCount((currVotes) => currVotes - incVotes);
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
