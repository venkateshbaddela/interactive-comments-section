import React from "react";
import ReactDom from "react-dom";
import Card from "./ui/Card";
import Button from "./ui/Button";
import styles from "./Modal.module.css";
import { useGlobalContext } from "./context";

const Backdrop = ({ showBackdrop }) => {
  return <>{showBackdrop && <Card className={styles.backdrop} />}</>;
};

const Overlay = ({ showModal, hideModalHandler, deleteCommentHandler }) => {
  return (
    <>
      {showModal && (
        <Card className={styles["overlay"]}>
          <h3 className={styles["modal-head"]}>Delete comment</h3>
          <p className={styles["modal-txt"]}>
            Are you sure you want to delete this comment?This will remove the
            comment and can't be undone
          </p>
          <Card className={styles["modal-btns"]}>
            <Button
              onClick={hideModalHandler}
              className={`${styles["modal-btn"]} ${styles["clc-btn"]}`}
            >
              NO, CANCEL
            </Button>
            <Button
              onClick={deleteCommentHandler}
              className={`${styles["modal-btn"]} ${styles["del-btn"]}`}
            >
              YES, DELETE
            </Button>
          </Card>
        </Card>
      )}
    </>
  );
};

function Modal() {
  const { showModal, showBackdrop, hideModalHandler, deleteCommentHandler } =
    useGlobalContext();

  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop showBackdrop={showBackdrop} />,
        document.body
      )}
      {ReactDom.createPortal(
        <Overlay
          showModal={showModal}
          hideModalHandler={hideModalHandler}
          deleteCommentHandler={deleteCommentHandler}
        />,
        document.body
      )}
    </React.Fragment>
  );
}

export default Modal;
