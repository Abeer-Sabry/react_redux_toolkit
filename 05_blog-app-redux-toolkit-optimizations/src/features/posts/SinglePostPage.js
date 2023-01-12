import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, getLoadingState, getPostById } from "./postsSlice";
import { Link, useParams } from "react-router-dom";
// components
import PostAuthor from "./PostAuthor";

// icons
import { ImBlogger } from "react-icons/im";
import { MdDescription } from "react-icons/md";
import { TbWriting } from "react-icons/tb";
import Spinner from "../../components/Spinner/Spinner";
const SinglePostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(getPostById);
  const loading = useSelector(getLoadingState);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  return (
    <section>
      {loading ? (
        <Spinner />
      ) : (
        <article>
          <Link to="/" className="singlePage">
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
          </Link>
          <div className="title">
            <div>
              <span className="icon">
                <TbWriting />
              </span>
            </div>
            <p className="postCredit">
              <PostAuthor userId={post?.userId} />
            </p>
          </div>
          <Link to={`/post/edit/${post?.id}`}>
            <span className="view edit">Edit Post</span>
          </Link>{" "}
        </article>
      )}
    </section>
  );
};

export default SinglePostPage;
