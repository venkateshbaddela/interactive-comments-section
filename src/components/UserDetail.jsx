import React from "react";
import Card from "./ui/Card";
import styles from "./UserDetail.module.css";

function UserDetail({ detail, curUser }) {
  return (
    <Card className={styles.detail}>
      <img
        src={require(`../assets/${detail.user.image.png}`)}
        alt={detail.user.username}
        className={styles["detail-img"]}
      />
      <h3 className={styles["detail-name"]}>{detail.user.username}</h3>

      {curUser.username === detail.user.username && (
        <span className={styles["detail-you"]}>you</span>
      )}

      <span className={styles["detail-time"]}>{detail.createdAt}</span>
    </Card>
  );
}

export default UserDetail;
