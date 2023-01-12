import React, { useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPostsData } from "./postsSlice";
// component
import PostItem from "./PostItem";
import HomeCover from "../../assets/cover.png";
import Spinner from "../../components/Spinner/Spinner";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    dispatch(fetchPostsData());
  }, [dispatch]);

  return (
    <section>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <img className="homeImage" src={HomeCover} alt="add blog" />
      </div>
      {postsStatus === "loading" ? (
        <Spinner />
      ) : postsStatus === "succeeded" ? (
        <main>
          {posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </main>
      ) : (
        postsStatus === "failed" && <p>{error}</p>
      )}
    </section>
  );
};

export default PostsList;
