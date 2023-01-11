import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";
import { HiUser } from "react-icons/hi";

const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map(user => (
    <div key={user.id}>
      <Link to={`/user/${user.id}`}>
        <span className="icon">
          <HiUser />
        </span>

        {user.name}
      </Link>
    </div>
  ));

  return (
    <section>
      <div className="userList">{renderedUsers}</div>
    </section>
  );
};

export default UsersList;
