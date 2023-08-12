import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const navigate = useNavigate();

  //로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signin");
    }
  }, []);
  return (
    <>
      <div>TodoList</div>
    </>
  );
}
