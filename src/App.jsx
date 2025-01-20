import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import jwtAxios from "./apis/jwt";
import { removeCookie, setCookie } from "./utils/cookie";

const loginData = {
  email: "qgq0520@naver.com",
  upw: "1234",
};
function App() {
  const [userInfoData, setUserInfoData] = useRecoilState();

  const loginApi = async () => {
    try {
      // 여기는 일반 axios로 로그인을 하고 jwt를 발급받는다.
      const res = await axios.get(`/api/user/access-token`, loginData);
      console.log("loginApi:", res);
      setCookie(`accessToken`, res.data.resultData);
      // 사용자의 정보를 App 전체에서 접근하려고 한다. (Recoil)
    } catch (error) {
      console.log(error);
      // 실패시 jwt 쿠키에서 제거
      removeCookie(`accessToken`);
    }
  };

  // jwt 인증키를 반드시 필요로 한 axios 호출
  const userInfo = async () => {
    try {
      const res = await jwtAxios.get(`/api/user`);
      console.log("userInfo:", res.data.resultData);
      setUserInfoData({ ...res.data.resultData });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loginApi();
  }, []);

  return (
    <div>
      <button type="button" onClick={() => userInfo()}>
        JWT 활용한 호출
      </button>
      <ul>
        <h1>유저 데이터</h1>
        <li>이름: {userInfoData.name}</li>
        <li>이메일: {userInfoData.email}</li>
        <li>닉네임: {userInfoData.nickName}</li>
        <li>전화번호: {userInfoData.phone}</li>
        <li>역할: {userInfoData.roleId}</li>
      </ul>
    </div>
  );
}
export default App;
