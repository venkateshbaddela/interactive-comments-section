import React, { useState, useContext, useEffect } from "react";
import jsonData from "../data/data.json";

const { currentUser: curUser, comments: comment } = jsonData;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [addComment, setAddComment] = useState(comment);
  const [addId, setAddId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [delComment, setDelComment] = useState({});

  /* Function to create new Id */
  const createId = () => {
    const lastComment = addComment[addComment.length - 1];

    if (lastComment.replies.length <= 0) {
      const commentId = lastComment.id;

      return commentId;
    }

    if (lastComment.replies.length > 0) {
      const replyId = lastComment.replies[lastComment.replies.length - 1].id;

      return replyId;
    }
  };
  const id = createId();

  useEffect(() => {
    setAddId(id + 1);
  }, [id]);

  /* Function to addReply */
  const replySubmitHandler = (comment, replyText) => {
    setAddId((prev) => {
      return prev + 1;
    });

    if (!comment.replies) comment.replies = [];

    const newReply = {
      id: addId,
      content: replyText.startsWith("@")
        ? replyText.split(" ").splice(1).join(" ")
        : replyText,
      createdAt: "Today",
      score: 0,
      replyingTo: comment.user.username,
      user: {
        image: {
          png: curUser.image.png,
        },
        username: curUser.username,
      },
    };

    const addReplyFilter = (data, id) => {
      return data.map((comt) => {
        if (comt.id === comment.id) comt.replies.unshift(newReply);
        if (comt.id !== comment.id && comt.replies) {
          addReplyFilter(comt.replies);
        }
        return comt;
      });
    };

    const addReply = addReplyFilter(addComment, comment.id);

    setAddComment(addReply);
  };

  /* Function to add new Comment */
  const commentSubmitHandler = (commentText) => {
    const newComment = {
      id: addId,
      content: commentText,
      createdAt: "1 week ago",
      score: 4,
      replies: [],
      user: {
        image: {
          png: curUser.image.png,
        },
        username: curUser.username,
      },
    };

    setAddComment((prev) => {
      return [...prev, newComment];
    });
  };

  /* Function to delete a Comment */
  const deleteCommentHandler = () => {
    const deleteFilter = (data, id) => {
      return data.filter((item) => {
        if (item.replies) {
          item.replies = deleteFilter(item.replies, id);
        }
        return item.id !== id;
      });
    };

    const newCommentList = deleteFilter(addComment, delComment.id);
    setAddComment(newCommentList);
    setShowBackdrop(false);
    setShowModal(false);
  };

  /* Function to update a Comment */
  const updateCommentHandler = (e, comment, updatedText) => {
    e.preventDefault();

    const updateFilter = (data, id) => {
      return data.map((comt) => {
        if (comt.id === comment.id) comt.content = updatedText;
        if (comt.id !== comment.id && comt.replies) {
          updateFilter(comt.replies, id);
        }
        return comt;
      });
    };

    const updatedCom = updateFilter(addComment, comment.id);

    setAddComment(updatedCom);
  };

  /* Function to close and open modal */
  const openModalHandler = () => {
    setShowBackdrop(true);
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowBackdrop(false);
    setShowModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        curUser,
        addComment,
        showModal,
        showBackdrop,
        setDelComment,
        openModalHandler,
        hideModalHandler,
        replySubmitHandler,
        commentSubmitHandler,
        deleteCommentHandler,
        updateCommentHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
