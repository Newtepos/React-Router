import { useEffect, useRef } from "react";

import classes from "./NewCommentForm.module.css";
import { addComment } from "../lib/api.js";
import useHttp from "../hooks/use-http.js";
import { useParams } from "react-router";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status } = useHttp(addComment);

  const {addCommentDone} = props;

  useEffect(() => {
    if (status === 'completed') {
      addCommentDone();
    }
  }, [status, addCommentDone]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredComment = commentTextRef.current.value;

    if(enteredComment.length === 0) {
      return alert("Please insert comment");
    }

    sendRequest({
      commentData: { text: enteredComment },
      quoteId: props.quoteID,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
