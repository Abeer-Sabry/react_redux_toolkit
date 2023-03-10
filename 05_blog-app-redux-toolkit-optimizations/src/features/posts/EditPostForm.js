import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
// React-Router
import { useParams, useNavigate } from "react-router-dom";
// assets
import Cover from "../../assets/editForm.png";
import { deletePost, getPostById, updatePost } from "./postsSlice";

const EditPostForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("idParams", id);
  const navigate = useNavigate();

  const post = useSelector(getPostById);
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  const [requestStatus, setRequestStatus] = useState("idle");

  console.log("userIdAddForm", userId);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(Number(e.target.value));

  // use these state ==> true
  const canSave = [title, content, userId].every(Boolean) && requestStatus === "idle";
  // EditPost
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post?.id,
            title: title,
            body: content,
            userId: userId,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${id}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  // Looping users-data
  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  // deletePost
  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost(post?.id)).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <main>
        <form>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postAuthor">Author:</label>
          <select id="postAuthor" defaultValue={userId} onChange={onAuthorChanged}>
            <option value=""></option>
            {usersOptions}
          </select>
          <label htmlFor="postContent">Content:</label>
          <textarea
            cols={5}
            rows={9}
            id="postContent"
            name="postContent"
            defaultValue={content}
            onChange={onContentChanged}
          />
          <button
            style={{ border: "1px solid #56ab2f", color: "#56ab2f" }}
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </button>
          <button
            style={{ border: "1px solid red", color: "red" }}
            type="button"
            onClick={onDeletePostClicked}
          >
            Delete Post
          </button>
        </form>
        <img
          style={{
            width: "100%",
          }}
          src={Cover}
          alt=""
        />
      </main>
    </section>
  );
};

export default EditPostForm;
