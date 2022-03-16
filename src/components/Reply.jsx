import React, { useRef, useEffect } from "react";
import Form from "./Form";
import Card from "./ui/Card";
import Button from "./ui/Button";
import styles from "./Reply.module.css";
import { useGlobalContext } from "./context";

function Reply({ curUser, comment, replyText, setReplyText, setActiveReply }) {
  const { replySubmitHandler } = useGlobalContext();

  const focusRef = useRef();
  useEffect(() => {
    setReplyText(`@${comment.user.username},  `);
    focusRef.current.focus();
  }, [comment.user.username, setReplyText]);

  return (
    <Card className={styles.reply}>
      <img
        src={require(`../assets/${curUser.image.png}`)}
        alt="person"
        className={styles["reply-img"]}
      />
      <Form
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        ref={focusRef}
      >
        <Button
          className={styles.btn}
          type="button"
          onClick={() => {
            replySubmitHandler(comment, replyText);
            setActiveReply(false);
          }}
        >
          {"Reply"}
        </Button>
      </Form>
    </Card>
  );
}

export default Reply;
