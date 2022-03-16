import React, { useState } from "react";
import Comment from "./Comment";
import Card from "./ui/Card";
import AddComment from "./AddComment";
import Modal from "./Modal";
import { useGlobalContext } from "./context";

function CommentGroup() {
  const [activeId, setActiveId] = useState(undefined);

  const { curUser, addComment: comment } = useGlobalContext();

  return (
    <Card>
      <Modal />
      {comment.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            curUser={curUser}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        );
      })}
      <AddComment curUser={curUser} comment={comment} />
    </Card>
  );
}

export default CommentGroup;
