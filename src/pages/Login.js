import React, { useState } from "react";
import { login } from "../apis/login_api";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLoginClick = async () => {
    try {
      const options = {
        userId: userId,
        password: password
      };

      const response = await login(options);

      // 로그인에 성공하면 응답 데이터에 유저 정보가 있을 것입니다.
      // 이를 사용하여 프론트엔드에서 세션을 유지할 수 있습니다.
      if (response.data) {
        // 로그인에 성공하면 유저 정보를 세션에 저장합니다.
        console.log("성공한거고로그인");
        console.log(response.data);
        sessionStorage.setItem("user", JSON.stringify(response.data));
        // 로그인 후에 어떤 페이지로 이동할지 결정할 수 있습니다.
        // 예를 들어, 로그인 후에 대시보드 페이지로 이동하도록 설정할 수 있습니다.
        window.location.href = "/";
      } else {
        // 로그인에 실패하면 에러 메시지를 출력합니다.
        console.log("씨발실패한거냐로그인");
        console.log(response.message);
      }
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  const handleFormSubmit = async (event) => {
    // if (isRemember) {
    //   setCookie("rememberEmail", userEmail);
    // }

    event.preventDefault();
    await onLoginClick();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* 계정 입력란 */}
        <div className="login_input column">
          <label>
            <input
              type="text"
              name="username"
              placeholder="아이디"
              value={userId}
              onChange={handleUsernameChange}
            />
          </label>

          {/* 비밀번호 입력란 */}
          <label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>

          <button className="label1 login" type="submit">
            로그인
          </button>
        </div>

        {/* <div className="find_wrap">
          <button className="body2" onClick={handleSignup}>
            회원가입&nbsp;&nbsp;&#124;&nbsp;&nbsp;
          </button>
          <button className="body2" onClick={handleFind}>
            임시 비밀번호 발급
          </button>
        </div> */}
      </form>
    </div>
  );
}

export default Login;
