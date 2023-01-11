import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";
// assets
import Cover from "../../assets/homePageCover-01-01.png";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // users-data from users-slice
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  console.log("userIdAddForm", userId);

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(e.target.value);

  // use these state ==> true
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle";
  // addPost button function
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  // Looping users-data
  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
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
          <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
            <option value=""></option>
            {usersOptions}
          </select>
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
          <button
            style={{ color: canSave ? "#686afd" : "" }}
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </button>
        </form>
        <div style={{ textAlign: "center" }}>
          <img
            style={{
              width: "90%",
            }}
            src={Cover}
            alt=""
          />
        </div>
      </main>
    </section>
  );
};

export default AddPostForm;
