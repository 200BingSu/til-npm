import { useRecoilState } from "recoil";
import { counterAtom, loginAtom } from "../atoms/counterAtom";

function CounterAtom() {
  const [count, setCount] = useRecoilState(counterAtom);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  return (
    <div>
      <h1>로그인 상태 : {isLogin ? "로그인 상태" : "로그아웃 상태"}</h1>
      <button type="button" onClick={() => setIsLogin(true)}>
        로그인
      </button>
      <button type="button" onClick={() => setIsLogin(false)}>
        로그아웃
      </button>
      <h1>CounterAtom: {count}</h1>
      <button type="button" onClick={() => setCount(count + 1)}>
        증가
      </button>
      <button type="button" onClick={() => setCount(count - 1)}>
        감소
      </button>
    </div>
  );
}
export default CounterAtom;
