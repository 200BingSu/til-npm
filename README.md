# 구글 로그인

## 과정

- 과정 1
  ![Image](https://github.com/user-attachments/assets/63b66acc-03d4-4286-be25-0e420c6b8149)
- 새 프로젝트 생성 및 사용자 인증 정보 추가
  ![Image](https://github.com/user-attachments/assets/8834aa0f-f688-4cea-a45b-32283776f081)
  ![Image](https://github.com/user-attachments/assets/cecae858-9c80-4a4d-8183-e5f05ebf4e4c)
  ![Image](https://github.com/user-attachments/assets/4d781b68-9467-4d5b-8410-fab5e53fa768)
  ![Image](https://github.com/user-attachments/assets/be2ec7af-c9a6-440f-b431-aff2fadd6f9c)
  ![Image](https://github.com/user-attachments/assets/c4df98c7-db73-4226-9fc6-d797db46cecf)
  ![Image](https://github.com/user-attachments/assets/56aa156e-f541-4b92-9484-728e8833d9a6)
  ![Image](https://github.com/user-attachments/assets/c8cfb4e6-8fae-4065-9dc5-261f90e2702b)
  ![Image](https://github.com/user-attachments/assets/58b22a09-dae7-41b3-82cc-8f2bf55838c1)
  ![Image](https://github.com/user-attachments/assets/11307ab6-6a33-44d3-92c1-a299b9ce8bd7)
  ![Image](https://github.com/user-attachments/assets/d2586f22-56d4-413a-b53c-fdc3ebc6b2cb)
  ![Image](https://github.com/user-attachments/assets/4d0aae73-3f2f-4e9f-95ff-31a19210f9d7)
  ![Image](https://github.com/user-attachments/assets/91faf8bb-3e01-429b-820d-a3ab38c0921b)
  ![Image](https://github.com/user-attachments/assets/f9b3f33e-96f1-49db-8fbd-83c21edc4e71)

## router 구성

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";
import After from "./pages/member/After";
import GoogleAfter from "./pages/member/GoogleAfter";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/join" element={<Join />} />
        <Route path="/member/kko" element={<After />} />
        <Route path="/member/google" element={<GoogleAfter />} />

        <Route path="/login" element={<h1>로그인</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
```

## 회원가입 시도 페이지

- `src/Join.jsx`

```jsx
import { Link } from "react-router-dom";
import { getGoogleLoginLink } from "./google/googleapi";
import { getKakaoLoginLink } from "./kko/kakaoapi";

function Join() {
  const kakaoLogin = getKakaoLoginLink();
  return (
    <div>
      <h1>SNS 로그인</h1>
      <div>
        <Link to={kakaoLogin}>카카오 로그인</Link>
      </div>
      <div>
        <button onClick={() => getGoogleLoginLink()}>구글 로그인</button>
      </div>
    </div>
  );
}
export default Join;
```

## 인가 키 처리

- `src/pages/member/GoogleAfter.jsx`

```jsx
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGoogleToken, getGoogleUserInfo } from "../../google/googleapi";
import { Button } from "antd";

const GoogleAfter = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // 카카오 인가 알아내기
  // http://localhost:5173/member/google?code=4%2F0ASVgi3J34nIJWXBkMWVe23jTDfVuZ57PH74fpzQfqHVnwtknH3sxcOxr6MuJKkvQ__ge7A&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  // searchparams 에서 code 알아내기
  const authCode = URLSearchParams.get("code");
  console.log(authCode);
  // 인가 키를 이용해서 Access Token 을 발급 받자
  const getAccessTokenCall = async () => {
    try {
      // Access Token
      const accessKey = await getGoogleToken(authCode);
      console.log("accessKey : ", accessKey);
      if (accessKey) {
        setAccessToken(accessKey.access_token);

        // 2. 액세스 토큰을 사용하여 사용자 정보 요청
        const userData = await getGoogleUserInfo(accessKey.access_token);
        console.log("Google User Info:", userData);
        setUserInfo(userData);
      }

      // state 보관
      //   setUserInfo(info);
    } catch (error) {
      console.log(error);
    }
  };
  //   // 인가 키가 존재한다면 그때 토큰 및 정보 호출
  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);

  return (
    <div>
      <h1>Google OAuth 로그인</h1>
      <h2>인가 코드: {authCode}</h2>
      <h2>Access Token: {accessToken ? "✅ 성공적으로 가져옴" : "❌ 없음"}</h2>

      {userInfo ? (
        <div>
          <p>아이디: {userInfo.id}</p>
          <p>이름: {userInfo.name}</p>
          <p>이메일: {userInfo.email}</p>
          <p>
            프로필 사진: <img src={userInfo.picture} alt="프로필" width={50} />
          </p>
          <label htmlFor="hobby">
            사용자 취미 <input type="text" name="hobby" id="hobby" />
          </label>
          <Button type="primary" htmlType="button">
            회원가입
          </Button>
        </div>
      ) : (
        <p>사용자 정보를 불러오는 중...</p>
      )}
    </div>
  );
};
export default GoogleAfter;
```
