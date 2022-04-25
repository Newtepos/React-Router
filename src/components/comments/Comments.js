import { Fragment, useCallback, useEffect, useState } from "react";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import { useParams } from "react-router";
import useHttp from "../hooks/use-http";
import { getAllComments } from "../lib/api";
import CommentsList from "./CommentsList";

const Comments = () => {
  let comment;

  const [isAddingComment, setIsAddingComment] = useState(false);

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const hideCommentHandler = () => {
    setIsAddingComment(false);
  };

  const { quoteID } = useParams();

  useEffect(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  if (status === "completed" && loadedComments) {
    comment = <CommentsList comments={loadedComments}></CommentsList>;
  }

  if (status === "completed" && (!loadedComments || loadedComments.length === 0 )) {
    comment = <p>No Comment</p>;
  }

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <Fragment>
          <NewCommentForm
            quoteID={quoteID}
            addCommentDone={addCommentHandler}
          />
        </Fragment>
      )}
      {comment}
    </section>
  );
};

export default Comments;
