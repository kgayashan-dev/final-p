// import React, { useEffect, useState } from "react";

// import {
//   query,
//   collection,
//   onSnapshot,
//   updateDoc,
//   doc,
//   addDoc,
//   getDoc,
//   deleteDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { auth, db } from "../../../../../utils/firebase";

// const ChatPage = () => {
//   const [user, setUser] = useState(auth.currentUser);
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageText, setMessageText] = useState("");

//   useEffect(() => {
//     // Fetch conversations for the current user

//     const qConversations = collection(db, "conversations");
//     const unsubscribeConversations = onSnapshot(qConversations, (snapshot) => {
//       const updatedConversations = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setConversations(updatedConversations);
//     });

//     return () => unsubscribeConversations();
//   }, [user]);

//   // Fetch messages for the selected conversation
//   const fetchMessages = async (conversation) => {
//     if (conversation) {
//       const qMessages = collection(
//         db,
//         `conversations/${conversation.id}/messages`
//       );
//       const unsubscribeMessages = onSnapshot(qMessages, (snapshot) => {
//         const updatedMessages = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMessages(updatedMessages);
//       });

//       return () => unsubscribeMessages();
//     }
//   };

//   useEffect(() => {
//     fetchMessages(selectedConversation);
//   }, [selectedConversation]);

//   const handleSendMessage = async () => {
//     if (!messageText.trim() || !selectedConversation) {
//       return;
//     }

//     const messageData = {
//       sender: user.email,
//       text: messageText,
//       timestamp: serverTimestamp(),
//     };

//     const messageRef = collection(
//       db,
//       `conversations/${selectedConversation.id}/messages`
//     );
//     await addDoc(messageRef, messageData);

//     setMessageText("");
//   };

//   return (
//     <div>
//       <h1>Chat Application</h1>
//       <div style={{ display: "flex" }}>
//         {/* Display conversations */}
//         <div>
//           <h2>Conversations</h2>
//           <ul>
//             {conversations.map((conversation) => (
//               <li
//                 key={conversation.id}
//                 onClick={() => setSelectedConversation(conversation)}
//               >
//                 {conversation.title}
//               </li>
//             ))}
//           </ul>
//         </div>
//         {/* Display messages */}
//         {selectedConversation && (
//           <div>
//             <h2>{selectedConversation.title}</h2>
//             <ul>
//               {messages.map((message) => (
//                 <li key={message.id}>
//                   <strong>{message.sender}</strong>: {message.text}
//                 </li>
//               ))}
//             </ul>
//             <div>
//               <input
//                 type="text"
//                 value={messageText}
//                 onChange={(e) => setMessageText(e.target.value)}
//               />
//               <button onClick={handleSendMessage}>Send</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
