import React from "react";
// components
import PostAuthor from "./PostAuthor";
import ReactionsButton from "./ReactionsButton";
import TimeAgo from "./TimeAgo";
// icons
import { ImBlogger } from "react-icons/im";
import { MdDescription } from "react-icons/md";
import { TbWriting } from "react-icons/tb";

const PostItem = ({ post }) => {
  return (
    <article key={post.id}>
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
          <PostAuthor userId={post.id} />
          <TimeAgo timestamp={post.date} />
        </p>
      </div>
      <ReactionsButton post={post} />
      <span className="view">View Post</span>
    </article>
  );
};

export default PostItem;
