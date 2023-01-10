import React from "react";
// components
import PostAuthor from "./PostAuthor";
import ReactionsButton from "./ReactionsButton";
import TimeAgo from "./TimeAgo";
// icons
import { ImBlogger } from "react-icons/im";
import { MdDescription } from "react-icons/md";
import { TbWriting } from "react-icons/tb";

import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <article>
      <div className="title">
        <div>
          <span className="icon">
            {" "}
            <ImBlogger />
          </span>
        </div>
        <h3 style={{ fontSize: "15px" }}> {post.title.substring(0, 60)}</h3>
      </div>
      <div className="title">
        <div>
          <span className="icon">
            <MdDescription />
          </span>
        </div>

        <p>{post.body.substring(0, 100)}</p>
      </div>
      <div className="title">
        <div>
          <span className="icon">
            <TbWriting />
          </span>
        </div>
        <p className="postCredit">
          {/* we pass the id which we received from postAdded payload */}
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
      </div>
      <ReactionsButton post={post} />
      <Link className="view" to={`/post/${post.id}`}>
        View Post
      </Link>
    </article>
  );
};

export default PostItem;
