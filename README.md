# react cookie 설치

: 웹 브라우저에 보관(시간)
: `npm i react-cookie`

# JWT

- JavaScript Web Token(자바스크립트 웹 문자열)
- 많은 회사가 JWT를 사용.
- 그런데, 반드시 사용하는 것은 아님.
- Token: 아주 길고 복잡한 문자열을 말함.

## JWT에는 필수적으로 2가지 종류가 있음.

### 1. Access 토큰

- API 요청시 (aixos, fetch 등)을 이용해서 정보 요청시 활용.
- API 요청시 Access 토큰을 내용에 담아서 백엔드로 같이 보냄.
- 모든 호출에 Access 토큰이 필요한 것은 아니다.

### 2. Refresch 토큰

- 백엔드에서 만약 JWT 인증키를 발급시 유효기간을 설정.
- 백엔드에서 기본적으로 30분을 인증시간으로 설정합니다.
- 백엔드에서 필요에 의해서 2시간, 10시간, 3일 등등 설정합니다. (개발에서는 5분 정도)

## proxy 설정하기

- vite.config.js

```json
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://112.222.157.156:5223",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
```

## JWT용 Axios 설정하기

- 꼭 기억! 모든 백엔드 연동에서 반드시 JWT를 사용하는 것이 아니다.
- 로그인 API는 JWT가 필요없다: 로그인하면 그때서야 `JWT`가 발급된다.
- 발급된 accessToken을 `cookie` 또는 `localStorage`에 보관함.
  : Recoil, useState, context에 보관하면 사라집니다.
  : 그래서 발급된 accessToken을 cookie에 보관하기로 함.
- `/src/apis` 폴더 생성

### 1. JWT 없이 사용하는 Axios

- 로그인 API

### 2. JWT가 필요한 Axios

- `/src/apis/jwt.js`
- interceptors를 설정해야함.
- 통상 Request 하기 전에 처리
- 통상 Request 한 이후 jwt 인증 통과 못한 에러 처리
- 통상 Response 하기 전에 처리
- 통상 Response 한 이후 jwt 인증 통과 못한 에러 처리

```js
import axios from "axios";

const jwtAxios = axios.create();
// axios 호출시 사전 옵션을 설정합니다.
// 1. 호출 즉 백엔드로 Request 하기 전에 옵션 붙이기
const beforeReq = config => {
  console.log("1. 요청 전에 먼저 전달", config);
  return config;
};
const failReq = err => {
  console.log("failReq Err", err);
  return Promise.reject(err);
};
// Response 즉, 회신 전에 처리함
const beforeRes = res => {
  console.log("2. 요청의 결과 전처리", res);
  return res;
};
const failRes = err => {
  console.log(`failRes 에러`, err);
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, failReq);
jwtAxios.interceptors.response.use(beforeRes, failRes);

export default jwtAxios;
```

## jwt 쿠키에 보관하기

- 쿠키를 보관하기 위한 파일 생성
- `/src/utils 폴더` 생성
- `/src/utils/cookie.js` 파일 생성

```js
import { Cookies } from "react-cookie";

const cookies = new Cookies();
// 쿠키에 저장하기
export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};
// 쿠키에 데이터 읽기
export const getCookie = name => {
  return cookies.get(name);
};
//  쿠키 삭제하기
export const removeCookie = name => {
  return cookies.remove(name, { path: "/" });
};
```

## jwt를 쿠키에 저장하는 과정

- 일반 axios로 로그인 시도

```jsx
import axios from "axios";
import { useEffect } from "react";
import { removeCookie, setCookie } from "./utils/cookie";

const loginData = {
  email: "qgq0520@naver.com",
  upw: "1234",
};
function App() {
  const loginApi = async () => {
    try {
      // 여기는 일반 axios로 로그인을 하고 jwt를 발급받는다.
      const res = await axios.get(`/api/user/access-token`, loginData);
      console.log(res);
      setCookie(`accessToken`, res.resultData);
    } catch (error) {
      console.log(error);
      // 실패시 jwt 쿠키에서 제거
      removeCookie(`accessToken`);
    }
  };
  useEffect(() => {
    loginApi();
  }, []);
  return (
    <div>
      <button type="button">JWT 활용한 호출</button>
    </div>
  );
}
export default App;
```

## 사용자 정보 recoil에 보관하기

- 사용자 로그인 API 연동 후 정보 저장
- `/src/atoms/userInfo.js`

```js
import { atom } from "recoil";

export const userInfo = atom({
  key: "userinfo",
  default: {
    userId: 0,
    roleId: 0,
    name: "",
    email: "",
    phone: "",
    birth: "",
    nickName: "",
    createdAt: "",
    // accessToken을 보관하는 것은 비추
  },
});
```

- `main.jsx`

```jsx
createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
```
