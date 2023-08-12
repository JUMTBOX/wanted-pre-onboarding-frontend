import React from "react";

export default function ListItem({
  el,
  deleteTodoList,
  getId,
}: {
  el: any;
  deleteTodoList: Function;
  getId: Function;
}) {
  return (
    <li className="rounded-md">
      <label>
        <input type="checkbox" />
        <span>{el.todo}</span>
      </label>
      <div className="space-x-2">
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
      </div>
    </li>
  );
}
