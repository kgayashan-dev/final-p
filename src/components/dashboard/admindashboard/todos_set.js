import React from "react";
import { RiTodoLine } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";

const TodoSet = ({ todo, togleComplete, deleteTodo }) => {
  const style = {
    li: `flex justify-between bg-white-400 w-auto p-2 my-2 border rounded-lg hover:cursor-pointer`,
    liCompleted: `ml-2 line-through`,
  };

  return (
    <div>
      <ul>
        <li className={style.li}>
          <div className="flex items-center gap-2  ">
            <input
              type="checkbox"
              checked={todo.completed ? "checked" : ""}
              name=""
              id=""
              onChange={() => togleComplete(todo)}
            />
            <h2
              onClick={() => togleComplete(todo)}
              className={todo.completed ? style.liCompleted : ""}
            >
              {todo.text}
            </h2>
          </div>

          <button
           onClick={() => deleteTodo(todo.id)}
            className=" bg-rose-200 text-black p-2 text-xl rounded-lg hover:bg-rose-400 focus:ring-2"
          >
            <BsFillTrashFill className="text-rose-600"/>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TodoSet;
