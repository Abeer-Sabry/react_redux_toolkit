import React, { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, fetchPostsData } from "./postsSlice";
import PostItem from "./PostItem";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);

  console.log("posts", posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPostsData());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>data is loading</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts.slice(0, 11).sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map(post => <PostItem key={post.id} post={post} />);
  } else if (postsStatus === "failed") {
    content = <p>error</p>;
  }
  return (
    <section>
      <main>{content}</main>
    </section>
  );
};

export default PostsList;
