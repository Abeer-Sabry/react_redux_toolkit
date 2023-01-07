import React from "react";
// components
import PostAuthor from "./PostAuthor";
import ReactionsButton from "./ReactionsButton";
import TimeAgo from "./TimeAgo";

const PostItem = ({ post }) => {
  return (
    <article key={post.id}>
      <h3 style={{ fontSize: "15px" }}>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        {/* we pass the id which we received from postAdded payload */}
        <PostAuthor userId={post.id} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionsButton post={post} />
    </article>
  );
};

export default PostItem;
