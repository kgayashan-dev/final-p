import React from "react";
import { data } from "../../data/data-des.js"; // Import the JSON data

const Users = ({ users }) => {
  return (
    <div className="h-screen m-2">
      <h1 className="text-2xl">List of Users</h1>
      {users.map((user) => {
        return (
          <div key={user.id} className="flex justify-start gap-3">
            <p>id: {user.id}</p>
            <p>category: {user.category}</p>
            <p>Name: {user.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Users;

export async function getStaticProps() {
  // Use the imported data directly
  const users = data;

  console.log(users);

  return {
    props: {
      users,
    },
  };
}
