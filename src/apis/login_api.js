const BASE_URL = "http://192.168.0.137:8000";

export async function login(options) {
  // console.log(options);

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  });

  // response 응답 체크 후 에러 발생로직
  // console.log('응답::', response);
  if (!response.ok) {
    throw new Error("로그인 실패했습니다.");
  }
  const body = await response.json();
  console.log("로그인확인바디 :: ", body);
  return body;
}
