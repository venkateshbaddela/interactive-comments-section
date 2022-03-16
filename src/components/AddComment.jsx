import React, { useState, useRef, useEffect } from "react";
import Form from "./Form";
import Button from "./ui/Button";
import Card from "./ui/Card";
import styles from "./AddComment.module.css";
import { useGlobalContext } from "./context";

function AddComment({ comment, curUser }) {
  const [commentText, setCommentText] = useState("");

  const { commentSubmitHandler } = useGlobalContext();

  const focusRef = useRef();

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return (
    <Card className={styles.addCmt}>
      <img
        src={require(`../assets/${curUser.image.png}`)}
        alt="person"
        className={styles["addCmt-img"]}
      />
      <Form
        className={styles["addCmt-form__btn"]}
        placeholder={"Add Comment..."}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        ref={focusRef}
      >
        <Button
          className={styles["addCmt-btn"]}
          type="button"
          onClick={() => {
            commentSubmitHandler(commentText);
            setCommentText("");
          }}
        >
          {"Submit"}
        </Button>
      </Form>
    </Card>
  );
}

export default AddComment;
