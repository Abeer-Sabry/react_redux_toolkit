import React from "react";
import { useSelector } from "react-redux";
import { getPostById } from "./postsSlice";
import { Link, useParams } from "react-router-dom";
// components
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionsButton from "./ReactionsButton";
// icons
import { ImBlogger } from "react-icons/im";
import { MdDescription } from "react-icons/md";
import { TbWriting } from "react-icons/tb";
const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector(state => getPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <p>Post not found!</p>
      </section>
    );
  }

  return (
    <section>
      {post ? (
        <article>
          <Link to="/" className="singlePage">
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
          </Link>
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
          <Link to={`/post/edit/${post.id}`}>
            <span className="view edit">Edit Post</span>
          </Link>
        </article>
      ) : (
        ""
      )}
    </section>
  );
};

export default SinglePostPage;
