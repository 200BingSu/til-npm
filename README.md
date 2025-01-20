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
