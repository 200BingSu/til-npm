import { useDispatch, useSelector } from "react-redux";
// store에 저장된 slice 중 어떤 action를 사용할 것인지
import { add, minus, reset } from "../features/counter/counterSlice";

function Counter() {
  // RTK의 store를 불러들여서 그 중 counter 사용하겠다.
  const { count } = useSelector(state => state.counter); // store의 reducer의 키와 키값를 사용
  console.log(count.count);
  //   RTK의 store의 counter의 값 갱신 dispatch 사용하겠다.
  const dispatch = useDispatch();
  return (
    <div>
      <p>카운터 값: {count}</p>
      <button type="button" onClick={() => dispatch(add())}>
        증가
      </button>
      <button type="button" onClick={() => dispatch(minus())}>
        감소
      </button>
      <button type="button" onClick={() => dispatch(reset())}>
        리셋
      </button>
    </div>
  );
}
export default Counter;
