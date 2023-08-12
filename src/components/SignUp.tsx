import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [emailCur, setEmailCur] = useState<string>("");
  const [passwordCur, setPasswordCur] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);

  const checkyong = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  //Input에 입력한 정보 요청날리기, 성공시 /signin으로 유도
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await axios.post(
      "https://www.pre-onboarding-selection-task.shop/auth/signup",
      {
        email: `${userEmail.current?.value}`,
        password: `${userPassword.current?.value}`,
      }
    );
    if (res.status === 201) {
      window.alert("회원가입 성공!");
      navigate("/signin");
    } else {
      console.log(res.data);
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

  //유효성 검사 통과 못할 시 SignUp버튼 disabled하기
  useEffect(() => {
    if (!emailCur.includes("@") || passwordCur.length < 8) {
      setIsDisabled(true);
      if (checkyong.current !== null) {
        checkyong.current.style.backgroundColor = "#FD6C64";
      }
    } else {
      setIsDisabled(false);
      if (checkyong.current !== null) {
        checkyong.current.style.backgroundColor = "#59e251";
      }
    }
  }, [emailCur, passwordCur]);

  return (
    <div className="signup_container w-full h-full flex justify-center px-6 py-12 lg:px-8">
      <div className="flex w-full h-full justify-center px-6">
        <form
          action="#"
          className="w-1/3 h-full  bg-white space-y-10 shadow-2xl rounded-lg "
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
              placeholder="이메일을 입력해주세요!"
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
              data-testid="signup-button"
              onClick={handleSubmit}
              className="flex w-1/2 h-8 justify-center shadow-md rounded-md"
              disabled={isDisabled}
              ref={checkyong}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
