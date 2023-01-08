import React from "react";

const Header = () => {
  return (
    <div className="header">
      <h3 style={{ cursor: "pointer" }}>Blogs</h3>
      <div className="navLinks">
        <span>posts</span>
        <span>users</span>
      </div>
    </div>
  );
};

export default Header;
