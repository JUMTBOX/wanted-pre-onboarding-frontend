import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

export default function SignIn() {
  const [emailCur, setEmailCur] = useState<string>("");
  const [passwordCur, setPasswordCur] = useState<string>("");
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  //
  const loginRequest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    isValidInfo();
    const res = await axios.post(
      "https://www.pre-onboarding-selection-task.shop/auth/signin",
      {
        email: `${userEmail.current?.value}`,
        password: `${userPassword.current?.value}`,
      }
    );
    if (res.status === 200) {
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/todo");
    } else {
      window.alert("로그인 실패..");
      console.log(res);
    }
  };

  const isValidInfo = (): void => {
    if (!emailCur.includes("@")) {
      if (userEmail.current !== null) {
        userEmail.current.style.border = "2px solid #FD6C64";
        userEmail.current.placeholder = "이메일 형식이 아닙니다!";
        userEmail.current.value = "";
      }
    } else {
      if (userEmail.current !== null) {
        userEmail.current.style.borderWidth = "0px";
        userEmail.current.placeholder = "이메일을 입력해주세요!";
      }
    }
    if (passwordCur.length < 8) {
      if (userPassword.current !== null) {
        userPassword.current.style.border = "2px solid #FD6C64";
        userPassword.current.value = "";
      }
    } else {
      if (userPassword.current !== null) {
        userPassword.current.style.borderWidth = "0px";
      }
    }
  };

  //Onchange 메소드 정의해서 현재 입력값 추적
  const emailOnchange = (): void => {
    if (userEmail.current !== null) {
      setEmailCur(userEmail.current.value);
    }
  };
  const passwordOnchange = (): void => {
    if (userPassword.current !== null) {
      setPasswordCur(userPassword.current.value);
    }
  };

  //로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    }
  }, []);

  return (
    <div className="signup_container w-full h-full flex justify-center px-6 py-12 lg:px-8">
      <div className="flex w-full h-full justify-center px-6">
        <form
          action="#"
          className="w-1/3 h-full bg-white space-y-10 shadow-2xl rounded-lg "
          method="post"
        >
          <div className="logo">
            <img src="/assets/images/pre.png" alt="logo" />
          </div>
          <div className="flex justify-center">
            <input
              data-testid="email-input"
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder={"이메일을 입력해주세요!"}
              required
              className="block w-2/3 rounded-md border-0 text-black shadow-md ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 sm: text-sm sm:leading-8"
              ref={userEmail}
              onChange={emailOnchange}
            />
          </div>
          <div className="flex justify-center">
            <input
              data-testid="password-input"
              type="password"
              className="block w-2/3 rounded-md border-0 text-black shadow-md ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 sm: text-sm sm:leading-8"
              placeholder="비밀번호는 8자 이상 입력해주세요!"
              required
              ref={userPassword}
              onChange={passwordOnchange}
            />
          </div>
          <div className="flex justify-center">
            <button
              data-testid="signin-button"
              onClick={loginRequest}
              className="flex w-1/2 h-8 justify-center shadow-md rounded-md"
              style={{ backgroundColor: "#6a66eb" }}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
