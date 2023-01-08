import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  // we map through users state to find the user which it's id equal to postAdded action payload id
  const author = users.find(user => user.id === userId);
  // we find it ? display it's name
  return (
    <span>
      by
      <mark> {author ? author.name : "unKnown author"} </mark>
    </span>
  );
};

export default PostAuthor;
