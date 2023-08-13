import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ListItem({
  el,
  deleteTodoList,
  getId,
  willMod,
  setWillMod,
}: {
  el: any;
  deleteTodoList: Function;
  getId: Function;
  willMod: any;
  setWillMod: Function;
}) {
  const [newTodo, setNewTodo] = useState<string>(el.todo);
  const [isComp, setIsComp] = useState<boolean>(el.isCompleted);
  const checkRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const accessToken = localStorage.getItem("access_token");

  const checkIsComp = (): void => {
    if (checkRef.current !== null) {
      setIsComp(checkRef.current.checked);
    }
  };

  const onChangeHandler = (): void => {
    if (inputRef.current !== null) {
      setNewTodo(inputRef.current.value);
    }
  };

  //Todo 업데이트 요청
  const updateTodoList = async (id: number, newTodo: string) => {
    if (checkRef.current !== null) {
      const res = await axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        { todo: newTodo, isCompleted: checkRef.current.checked },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.status === 200) {
        setWillMod(0);
      }
    }
  };

  return (
    <li className="rounded-md">
      <label>
        <input
          type="checkbox"
          ref={checkRef}
          onChange={checkIsComp}
          checked={isComp}
        />
        {willMod !== el.id ? (
          <span>{el.todo}</span>
        ) : (
          <input
            type="text"
            value={newTodo}
            ref={inputRef}
            onChange={onChangeHandler}
          />
        )}
      </label>
      <div className="space-x-2">
        {willMod !== el.id ? (
          <>
            <button
              data-testid="modify-button"
              onClick={() => {
                getId(el.id);
              }}
            >
              수정
            </button>
            <button
              data-testid="delete-button"
              onClick={() => {
                deleteTodoList(el.id);
              }}
            >
              삭제
            </button>
          </>
        ) : (
          <>
            <button
              data-testid="submit-button"
              onClick={() => {
                updateTodoList(el.id, newTodo);
              }}
            >
              제출
            </button>
            <button data-testid="cancel-button" onClick={() => setWillMod(0)}>
              취소
            </button>
          </>
        )}
      </div>
    </li>
  );
}
