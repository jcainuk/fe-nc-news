import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div>
      <h3 className="mt-4">Comments</h3>
      <ul className="list-group">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="list-group-item">
            <div className="mb-2">
              <p className="mb-0">{comment.body}</p>
            </div>
            <div className="text-dark small">
              <strong>Author:</strong>{" "}
              <span className="text-primary">{comment.author}</span> |{" "}
              <strong>Created At:</strong>{" "}
              {new Date(comment.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
