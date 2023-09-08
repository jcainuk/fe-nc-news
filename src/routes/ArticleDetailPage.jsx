import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import ArticleFinder from "../apis/ArticleFinder";
import CommentList from "../components/CommentList";
import VoteArticle from "../components/VoteArticle";
import CommentForm from "../components/CommentForm";

const loggedInUser = "grumpy19";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleResponse = await ArticleFinder.get(`/articles/${id}`);
        const commentsResponse = await ArticleFinder.get(
          `/articles/${id}/comments`
        );

        setSelectedArticle(articleResponse.data.article);
        setComments(commentsResponse.data.comments);
        setIsLoading(false);
        setVoteCount(articleResponse.data.article.votes);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        setIsError(true);
      }
    };
    fetchData();
  }, [id]);

  const addCommentToUI = (comment) => {
    setComments((prevComments) => [comment, ...prevComments]);
  };

  const handleDeleteComment = async (commentId) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.comment_id === commentId) {
          return { ...comment, isDeleting: true };
        }
        return comment;
      });
    });

    try {
      await ArticleFinder.delete(`/comments/${commentId}`);

      setComments((prevComments) => {
        return prevComments.filter(
          (comment) => comment.comment_id !== commentId
        );
      });
    } catch (error) {
      console.error("Error deleting comment:", error);

      if (error.response && error.response.status === 404) {
        alert("Comment not found.");
      } else {
        alert("An error occurred while deleting the comment.");
      }

      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.comment_id === commentId) {
            return { ...comment, isDeleting: false };
          }
          return comment;
        });
      });
    }
  };

  return (
    <div>
      <NavigationBar />
      <Header />
      <div className="container mt-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>An error occurred while fetching data.</p>
        ) : (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              {selectedArticle && (
                <div className="card">
                  <img
                    src={selectedArticle.article_img_url}
                    className="card-img-top"
                    alt={selectedArticle.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{selectedArticle.title}</h5>
                    <p className="card-text">Topic: {selectedArticle.topic}</p>
                    <p className="card-text">
                      Author: {selectedArticle.author}
                    </p>
                    <p className="card-text">{selectedArticle.body}</p>
                    <p className="card-text">
                      Date Created:{" "}
                      {new Date(
                        selectedArticle.created_at
                      ).toLocaleDateString()}
                    </p>
                    <VoteArticle
                      id={id}
                      initialVoteCount={selectedArticle?.votes || 0}
                      voteCount={voteCount}
                      setVoteCount={(newVoteCount) =>
                        setVoteCount(newVoteCount)
                      }
                    />
                  </div>
                </div>
              )}
              <div className="mt-4">
                <CommentForm id={id} onCommentSubmit={addCommentToUI} />{" "}
                {comments.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  <CommentList
                    comments={comments}
                    onDeleteComment={handleDeleteComment}
                    loggedInUser={loggedInUser}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
