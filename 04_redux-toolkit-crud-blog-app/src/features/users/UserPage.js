import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersById, selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";
// icons
import { HiUser } from "react-icons/hi";
import { ImBlogger } from "react-icons/im";

const UserPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userItem = useSelector(selectUserById);
  // console.log("userItem", userItem);

  useEffect(() => {
    dispatch(fetchUsersById(userId));
  }, [dispatch, userId]);

  const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId)));
  // const postsForUser = useSelector(state => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter(post => post.userId === Number(userId));
  // });

  const postTitles = postsForUser.map(post => (
    <div key={post.id}>
      <Link to={`/post/${post.id}`}>
        <span className="icon">
          <ImBlogger />
        </span>
        {post.title}
      </Link>
    </div>
  ));

  return (
    <section>
      <div className="title" style={{ marginBottom: "30px" }}>
        <span className="icon">
          <HiUser />
        </span>
        <mark>
          <h2 style={{ margin: "0" }}>{userItem?.name}</h2>
        </mark>
      </div>
      <div className="postList">{postTitles}</div>
    </section>
  );
};

export default UserPage;
