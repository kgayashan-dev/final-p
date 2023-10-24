import React, { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../../utils/firebase";
import TodoSet from "./todos_set";

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  // delete toodo from db
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todo", id));
    toast.error("Your todo is deleted", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,

    })
  };

  useEffect(() => {
    const q = query(collection(db, "todo"));

    // Fetch manager data from Firestore
    const unsubscribeTodo = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTodo(todoArr);
    });
    return () => {
      unsubscribeTodo();
    };
  }, []);
  // create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      // alert("Please enter a task");
      toast.warning("Your todo is empty 😕", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,

      })
    }
    await addDoc(collection(db, "todo"), {
      text: input,
      completed: false,
    });
    setInput("");

    toast.success("Your todo put well ✅", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };
  // update todos
  const togleComplete = async (todo) => {
    await updateDoc(doc(db, "todo", todo.id), {
      completed: !todo.completed,
    });
  };

  return (
    <div className="p-6 ">
      <div className="mb-6">
        <h1 className="font-medium text-xl">Technician's Todo List</h1>
      </div>

      <div className="my-6">
        <p>
          Utilize the option to include tasks or to-do items that are relevant
          to your current list. This feature allows you to add and organize
          tasks based on your specific needs and preferences.
        </p>
      </div>
      <div className=" border rounded-lg  p-4 h-[70vh] overflow-scroll">
        <form onSubmit={createTodo}>
          <div className="mb-6 flex justify-end items-center">
           
            <input
              type="text"
              id="todos"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter todos here."
              required
            />

            <button
              type="submit"
              className="text-white absolute  bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </form>

        <div className="capitalize ">
          {todo.map(
            (
              todoItem // Renamed to todoItem to represent individual todo object
            ) => (
              <TodoSet
                key={todoItem.id}
                todo={todoItem} // Pass the individual todo object to TodoSet component
                togleComplete={togleComplete}
                deleteTodo={deleteTodo}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
