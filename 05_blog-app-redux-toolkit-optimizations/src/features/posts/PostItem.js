import React from "react";
// components
import PostAuthor from "./PostAuthor";

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
        <h3 className="mainTitle"> {post?.title.substring(0, 60)}</h3>
      </div>
      <div className="title">
        <div>
          <span className="icon">
            <MdDescription />
          </span>
        </div>

        <p>{post?.body.substring(0, 100)}</p>
      </div>
      <div className="title">
        <div>
          <span className="icon">
            <TbWriting />
          </span>
        </div>
        <p className="postCredit">
          {/* we pass the id which we received from postAdded payload */}
          <PostAuthor userId={post?.userId} />
        </p>
      </div>
      <Link className="view" to={`/post/${post?.id}`}>
        View Post
      </Link>
    </article>
  );
};

export default React.memo(PostItem);
