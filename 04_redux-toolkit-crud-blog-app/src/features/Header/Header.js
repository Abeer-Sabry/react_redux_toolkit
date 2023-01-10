import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h3 style={{ cursor: "pointer" }}>
        {" "}
        <Link to="/">Blogs</Link>
      </h3>

      <div className="navLinks">
        <Link to="/post">
          <span>posts</span>
        </Link>
        <span>users</span>
      </div>
    </div>
  );
};

export default Header;
