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
