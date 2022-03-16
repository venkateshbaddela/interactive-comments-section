import React, { useState, useEffect } from "react";
import UserDetail from "./UserDetail";
import UserVote from "./UserVote";
import Form from "./Form";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Reply from "./Reply";
import BtnBox from "./BtnBox";
import styles from "./Comment.module.css";
import { useGlobalContext } from "./context";

function Comment({ comment, curUser, activeId, setActiveId }) {
  const [editComment, setEditComment] = useState(false);
  const [activeReply, setActiveReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [updatedText, setUpdatedText] = useState("");

  const { updateCommentHandler } = useGlobalContext();

  useEffect(() => {
    if (activeId !== comment.id) {
      setActiveReply(false);
    }
  }, [activeId, activeReply, comment.id]);

  const nestedComments = (comment.replies || []).map((comment) => {
    return (
      <Card key={comment.id} className={styles["cmt-reply"]}>
        <Comment
          comment={comment}
          curUser={curUser}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      </Card>
    );
  });

  const replies =
    nestedComments.length <= 0 ? (
      []
    ) : (
      <Card className={styles["sec-reply"]}> {nestedComments} </Card>
    );

  const commentToEdit = editComment ? (
    <Form
      className={styles["update-form"]}
      value={updatedText}
      onChange={(e) => setUpdatedText(e.target.value)}
    >
      <Button
        className={styles["update-btn"]}
        onClick={(e) => {
          updateCommentHandler(e, comment, updatedText);
          setEditComment(false);
        }}
      >
        {"Update"}
      </Button>
    </Form>
  ) : (
    <>
      <p className={styles["cmt-detail__txt"]}>
        {comment.replyingTo && (
          <span className={styles["cmt-detail__txt span"]}>
            {`@${comment.replyingTo},`}
          </span>
        )}
        {comment.content}
      </p>
    </>
  );

  return (
    <React.Fragment>
      <Card className={styles.cmt}>
        <Card className={styles["cmt-box"]}>
          <UserVote score={comment.score} />
          <Card className={styles["cmt-detail"]}>
            <Card className={styles["cmt-detail-box"]}>
              <UserDetail curUser={curUser} detail={comment}></UserDetail>
              <BtnBox
                comment={comment}
                curUser={curUser}
                setActiveId={setActiveId}
                setEditComment={setEditComment}
                setActiveReply={setActiveReply}
                setUpdatedText={setUpdatedText}
              />
            </Card>
            {commentToEdit}
          </Card>
        </Card>
      </Card>

      {activeReply && (
        <Reply
          curUser={curUser}
          comment={comment}
          replyText={replyText}
          activeReply={activeReply}
          setReplyText={setReplyText}
          setActiveReply={setActiveReply}
        />
      )}

      {replies}
    </React.Fragment>
  );
}

export default Comment;
