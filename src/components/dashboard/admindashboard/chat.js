// import React, { useState } from "react";
// import { useFirebase } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const firebase = useFirebase();
//   const db = firebase.firestore();

//   const handleMessageSubmit = (message) => {
//     db.collection("messages").add({
//       text: message,
//       sender: firebase.auth().currentUser.uid,
//       recipient: selectedUser,
//     });
//   };

//   const handleUserSelect = (user) => {
//     setSelectedUser(user);
//   };

//   const getMessages = async () => {
//     const snapshot = await db.collection("messages").where("recipient", "==", selectedUser).get();
//     setMessages(snapshot.docs.map((doc) => doc.data()));
//   };

//   useEffect(() => {
//     getMessages();
//   }, [selectedUser]);

//   return (
//     <div>
//       <h1>Chat</h1>
//       <input
//         type="text"
//         placeholder="Enter message"
//         onChange={(e) => handleMessageSubmit(e.target.value)}
//       />
//       <ul>
//         {messages.map((message) => (
//           <li key={message.id}>
//             {message.sender}: {message.text}
//           </li>
//         ))}
//       </ul>
//       <select
//         onChange={handleUserSelect}
//       >
//         <option value="">Select user</option>
//         {firebase.auth().currentUser.users.map((user) => (
//           <option key={user.uid} value={user.uid}>
//             {user.displayName}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Chat;