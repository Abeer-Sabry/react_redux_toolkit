import React, { useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";
// assets
import Cover from "../../assets/cover.png";

const AddPostForm = () => {
  const dispatch = useDispatch();
  // users-data from users-slice
  const users = useSelector(selectAllUsers);

  // input-States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // we want the id of each user
  const [userId, setUserId] = useState("");
  console.log("Boolean", Boolean(title));

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(e.target.value);

  // use these state ==> true
  const canSave = [title, content, userId].every(Boolean);
  // addPost button function
  const onSavePostClicked = () => {
    if (canSave) {
      // unwrap func that's function from redux toolkit to send a promise if the
      // action fulfilled or rejected to track the action//
      dispatch(addNewPost({ title, body: content })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
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

export default AddPostForm;
