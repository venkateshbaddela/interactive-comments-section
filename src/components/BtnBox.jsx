import React from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { ReactComponent as TrashIcon } from "../assets/icons/icon-delete.svg";
import { ReactComponent as EditIcon } from "../assets/icons/icon-edit.svg";
import { ReactComponent as ReplyIcon } from "../assets/icons/icon-reply.svg";
import styles from "./Comment.module.css";
import { useGlobalContext } from "./context";

function BtnBox({
  comment,
  curUser,
  setEditComment,
  setUpdatedText,
  setActiveReply,
  setActiveId,
}) {
  const { openModalHandler, setDelComment } = useGlobalContext();

  return (
    <>
      {comment.user.username === curUser.username ? (
        <Card className={styles["cmt-btn__box"]}>
          <Button
            className={`${styles.btns} ${styles["delete-btn"]}`}
            onClick={() => {
              openModalHandler();
              setDelComment(comment);
            }}
          >
            <TrashIcon />
            <span className="">Delete</span>
          </Button>
          <Button
            className={`${styles.btns} ${styles["edit-btn"]}`}
            onClick={() => {
              setEditComment(true);
              setUpdatedText(comment.content);
            }}
          >
            <EditIcon />
            <span className="">Edit</span>
          </Button>
        </Card>
      ) : (
        <Button
          className={styles["cmt-reply__btn"]}
          onClick={() => {
            setActiveReply(true);
            setActiveId(comment.id);
          }}
        >
          <ReplyIcon />
          {"Reply"}
        </Button>
      )}
    </>
  );
}

export default BtnBox;
