import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Todo.css";
import ListItem from "./ListItem";

export default function Todo() {
  const [willMod, setWillMod] = useState<number>(0);
  const [todos, setTodos] = useState<[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  const handleOnclick = (): void => {
    if (inputRef.current !== null) {
      createTodoList(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  //Todo 목록 가져오기 요청
  const getTodoList = async () => {
    const res = await axios.get(
      "https://www.pre-onboarding-selection-task.shop/todos",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.status === 200) {
      setTodos(res.data);
    }
  };

  //Todo 생성 요청
  const createTodoList = async (todo: string) => {
    await axios.post(
      "https://www.pre-onboarding-selection-task.shop/todos",
      { todo: todo },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  //Todo 삭제 요청
  const deleteTodoList = async (id: number) => {
    const res = await axios.delete(
      `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  //수정 모드로 변경할  Todo의 아이디를 받아오는 함수(props로 내려줌)
  const getModified = (id: number) => {
    setWillMod(id);
  };

  //로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signin");
    } else {
      //Todo 리스트 목록 요청 실행
      getTodoList();
    }
  }, [todos, willMod]);

  return (
    <div className="todo_container flex justify-center w-2/3 h-4/5 bg-white shadow-xl rounded-lg">
      <div className="todo_box flex flex-col w-4/5 h-4/5">
        <div className="flex space-x-8">
          <input
            type="text"
            data-testid="new-todo-input"
            className="input_add w-80 ring-1 ring-inset ring-gray-400 rounded-md px-4 py-1"
            ref={inputRef}
          />
          <button
            data-testid="new-todo-add-button"
            className="add_btn shadow-md px-4 py-1 rounded-md"
            onClick={handleOnclick}
          >
            추가
          </button>
        </div>
        <ul className="content_box w-full space-y-4">
          {todos.map((el: any, idx) => (
            <ListItem
              el={el}
              deleteTodoList={deleteTodoList}
              getId={getModified}
              willMod={willMod}
              setWillMod={setWillMod}
              key={idx}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
