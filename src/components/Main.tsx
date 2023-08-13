import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Main.css";

export default function Main() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
      navigate("/todo");
    }
  }, []);

  return (
    <div className="main_container flex justify-center">
      <nav className="main_header w-full h-20 flex space-x-10 px-16">
        <div>
          <h2>프론트엔드 | 프리온보딩 인턴십 8월</h2>
        </div>
        <div className="flex w-1/4 h-3/4 space-x-8">
          <Link to={"/signin"}>로그인</Link>
          <Link to={"/signup"}>회원가입</Link>
        </div>
      </nav>
    </div>
  );
}
