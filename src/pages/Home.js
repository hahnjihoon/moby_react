import { useNavigate } from "react-router-dom";

export default function Home() {
  const divStyle = {
    color: "black" // 텍스트의 색상을 검정색으로 지정
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  const handleLogout = () => {
    console.log("스토리지에머있냐");
    console.log(sessionStorage);
    // sessionStorage.setItem("user", JSON.stringify(response.data));
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div>
      <div style={divStyle}>시작하는페이지</div>
      <div>
        {sessionStorage.getItem("user") ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <button onClick={handleLoginClick}>로그인</button>
        )}
      </div>
    </div>
  );
}
