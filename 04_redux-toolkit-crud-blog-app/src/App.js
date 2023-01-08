import "./App.css";
import Header from "./features/Header/Header";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";

function App() {
  return (
    <div className="App">
      <Header />
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default App;
