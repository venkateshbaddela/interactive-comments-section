import React, { useState } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { ReactComponent as PlusImg } from "../assets/icons/icon-plus.svg";
import { ReactComponent as MinusImg } from "../assets/icons/icon-minus.svg";
import styles from "./UserVote.module.css";

function UserVote({ score }) {
  const [newScore, setNewScore] = useState(score);
  const [disableBtn1, setDisableBtn1] = useState(false);
  const [disableBtn2, setDisableBtn2] = useState(false);

  const incScoreHandler = (e) => {
    setDisableBtn2(false);
    setNewScore(newScore + 1);
    console.log(newScore);
    if (newScore >= score) setDisableBtn1(true);
  };

  const decScoreHandler = () => {
    setDisableBtn1(false);
    setNewScore(newScore - 1);
    if (newScore <= score || newScore <= 1) setDisableBtn2(true);
  };

  return (
    <Card className={styles.vote}>
      <Button
        disable={disableBtn1}
        className={styles["vote-btns"]}
        onClick={(e) => incScoreHandler(e)}
      >
        <PlusImg />
      </Button>
      <span className={styles.score}>{newScore}</span>
      <Button
        disable={disableBtn2}
        className={styles["vote-btns"]}
        onClick={decScoreHandler}
      >
        <MinusImg />
      </Button>
    </Card>
  );
}

export default UserVote;
