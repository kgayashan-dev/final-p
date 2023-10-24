import React, { useState } from "react";
import Chat from "../chatApp/chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../utils/firebase";

function App() {
  const [selectedUserEmail, setSelectedUserEmail] = useState();
  const [currentUser, setCurrentUser] = useState("");

  const [user,setUSer] = useAuthState(auth)
  
  setSelectedUserEmail(user.email)

console.log(user);
  return (
    <div>
      <h1>Chat App</h1>
      <Chat selectedUserEmail={selectedUserEmail} currentUser={currentUser} />
    </div>
  );
}

export default App;
