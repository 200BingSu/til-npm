import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "./kko/kakaoapi";

function Join() {
  const kakaoLogin = getKakaoLoginLink();
  return (
    <div>
      <h1>SNS 로그인</h1>
      <button type="button" style={{ backgroundColor: "skyblue" }}>
        <Link to={kakaoLogin}>카카오</Link>
      </button>
    </div>
  );
}
export default Join;
