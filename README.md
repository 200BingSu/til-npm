# JWT 프로젝트 반영

- 사용자 인증은 2가지가 있습니다.
- 세션 인증
- JWT 인증
- 하이브리드 세션 + JWT 인증 혼합

## 1. jwt (JSON Web Token)

- 복잡한 문자열(토큰)을 서버에서 만들어서 준다.

## 2. 시라리오

- 사용자가 로그인 후 Response로 accessToken만 올 경우.
- refresh가 없음.
  - 서버 관리자가 15분마다 accessToken을 지움.

## 3 . accessToken만 있는 경우

### 1. 만료되면 로그아웃 시킨다.

### 2. 만료되면 accessToken을 재발행한다.

## 4. 필요로 한 npm

- axios
- recoil
- react-cookie

```jsx
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginInfoState } from "./atoms/userInfo";
import { setCookie } from "./utils/cookie";

function App() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);

  const login = async () => {
    try {
      const res = await axios.post("/api/user/sign-in", {
        email: "dkssud123@tmails.net",
        upw: "1q2w3e4R!",
      });
      console.log(res.data);
      setLoginInfo(res.data.resultData);
      setCookie("accessToken", res.data.resultData.accessToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>JWT : accessToken 만 존재</h1>
      <button
        onClick={() => {
          login();
        }}
      >
        로그인
      </button>
      <p>인증키 : {loginInfo?.accessToken}</p>
    </div>
  );
}
export default App;
```

## 6. jwt 정보로 accessToken으로 axios 호출하기

- axios 호출 시 header에 Authorization의 Bearer에 담는다.
- 만약 401 즉, 만료가 오면 로그인으로 오면
- 대응법 1: 로그인으로 다시 이동
- 대응법 2: 토큰 재발급 후 다시 axios로 호출

```jsx
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginInfoState } from "./atoms/userInfo";
import { removeCookie, setCookie } from "./utils/cookie";
import { Button } from "antd";

function App() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const login = async () => {
    try {
      const res = await axios.post("/api/user/sign-in", {
        email: "dkssud123@tmails.net",
        upw: "1q2w3e4R!",
      });
      console.log(res.data);
      // 리코일에 전체 저장
      setLoginInfo(res.data.resultData);
      // 쿠키에 보관하기
      setCookie("accessToken", res.data.resultData.accessToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>JWT : accessToken 만 존재</h1>
      <Button
        type="primary"
        onClick={() => {
          login();
        }}
      >
        로그인
      </Button>
      <p>인증키 : {loginInfo?.accessToken}</p>

      <Test />
    </div>
  );
}
export default App;

function Test() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const accessToken = loginInfo.accessToken;
  const callFn = async () => {
    try {
      const res = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);
      // 만약에 인증키 만료라면(unAthorized)
      if (res.status === 401) {
        // 인증키가 만료되었다고 온다면
        // 선택을 해야한다.
        removeCookie("accessToken");
        // 1. 강제로 다시 로그인
        // setLoginInfo({});
        // alert("다시 로그인을 해주세요");
        // alert("라우터로 login창으로 이동합니다.");
        // 2. 다시 accessToken 재발행
        resetToken();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetToken = async () => {
    try {
      const res = await axios.get(`/api/user/access-token`);
      console.log(res.data);
      setCookie("accessToken", res.data.resultData.accessToken);
      setLoginInfo(prev => ({
        ...prev,
        accessToken: res.data.ressulData.accessToken,
      }));
      // 본래 하려던 api 호출
      callFn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>테스트</h1>
      <Button type="primary" onClick={() => callFn()}>
        api 호출
      </Button>
    </div>
  );
}
```
