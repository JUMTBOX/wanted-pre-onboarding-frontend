import React, { useRef, useState } from "react";
import axios from "axios";

export default function Mod({
  el,
  setWillMod,
}: {
  el: any;
  setWillMod: Function;
}) {
  const [newTodo, setNewTodo] = useState<string>(el.todo);
  const inputRef = useRef<HTMLInputElement>(null);
  const accessToken = localStorage.getItem("access_token");

  const onChangeHandler = () => {
    if (inputRef.current !== null) {
      setNewTodo(inputRef.current.value);
    }
  };

  //Todo 업데이트 요청
  const updateTodoList = async (id: number, newTodo: string) => {
    const res = await axios.put(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      { todo: newTodo, isCompleted: true },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.status === 200) setWillMod(0);
  };

  return (
    <li className="rounded-md">
      <label>
        <input type="checkbox" />
        <input
          type="text"
          ref={inputRef}
          onChange={onChangeHandler}
          value={newTodo}
        />
      </label>
      <div className="space-x-2">
        <button
          data-testid="modify-button"
          onClick={() => {
            updateTodoList(el.id, newTodo);
          }}
        >
          제출
        </button>
        <button data-testid="delete-button" onClick={() => setWillMod(0)}>
          취소
        </button>
      </div>
    </li>
  );
}
