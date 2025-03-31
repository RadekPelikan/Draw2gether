import React from "react";

const UserCard = ({ item, user }) => {
  return (
    <>
      <div className={`user-card ${user.id === item.id ? "this" : ""}`}>
        <div>{item.name}</div>
        <div className="user-card-id" >{item.id}</div>
      </div>
    </>
  );
};

export default UserCard;
