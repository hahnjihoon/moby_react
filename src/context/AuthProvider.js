import { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { auth_token } from "../apis/auth_api";
import Home from "../pages/Home";
import Login from "../pages/Login";

const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
  // const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  // const history = useHistory();

  // console.log(user);

  useEffect(() => {
    // 서버에 인증 상태를 확인하는 요청 보내기
    const checkAuth = async () => {
      try {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        console.log("인증보내기전에 로컬에서 뽑아낸거 :: ", storedUser);
        if (storedUser === null) {
          setAuthenticated(false);
          return;
        }

        const response = await auth_token(storedUser);
        console.log("인증리턴 :: ", response);

        if (!response.sessionId) {
          console.log("펄스");
          return;
        } else {
          console.log("트루");
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []);

  // if (authenticated === false) {
  //   console.log("인증 실패");
  return (
    <AuthContext.Provider value={{ authenticated }}>
      {authenticated === true ? (
        children
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      )}
    </AuthContext.Provider>
  );
}

// return (
//   <div>
//     <h1>Private Route</h1>
//     {/* 이하 인증된 사용자만 접근 가능한 컴포넌트들 */}
//   </div>
// );
// }

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  return context;
}
