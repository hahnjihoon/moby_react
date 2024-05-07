// import {BASE_URL} from '../apis'
const BASE_URL = "http://192.168.0.137:8000";

export async function auth_token(options) {
  console.log("프론트에서api넘겨준거: ", options);

  try {
    const response = await fetch(`${BASE_URL}/auth/checkAuth`, {
      method: "GET",
      credentials: "include", // 쿠키를 서버에게 보낼 수 있도록 설정
      headers: {
        "Content-Type": "application/json",
        // 세션 스토리지에서 가져온 사용자 데이터를 헤더에 포함시킵니다.
        Authorization: `Bearer ${options}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log("인증성공했을때!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", data);
      return data;
      // 여기서 반환된 데이터에 따라 로직을 처리할 수 있습니다.
      // 예를 들어, 인증된 사용자라면, data에 사용자 정보가 포함되어 있을 것입니다.
    } else {
      throw new Error("인증 실패");
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
  }
}
