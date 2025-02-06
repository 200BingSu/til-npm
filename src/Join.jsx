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
