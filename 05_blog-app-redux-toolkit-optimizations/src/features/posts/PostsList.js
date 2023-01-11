import React, { useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPostsData } from "./postsSlice";
// component
import PostItem from "./PostItem";
import HomeCover from "../../assets/cover.png";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    dispatch(fetchPostsData());
  }, [dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = posts.map(post => <PostItem key={post.id} post={post} />);
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }
  return (
    <section>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <img style={{ width: "90%" }} src={HomeCover} alt="add blog" />
      </div>
      <main>{content}</main>
    </section>
  );
};

export default PostsList;
