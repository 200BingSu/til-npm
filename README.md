# Redux Tool Kit(RTK)

- 전역 상태(즉, context)를 관리하는 `상태 관리 도구`
  : Context API(리액트 빌트인)
  : Redux, Redux ToolKit, Recoil, Zustand(npm)

## 래퍼런스 사이트에서 RTK 추천.

```
npm install @reduxjs/toolkit
npm i react-redux
```

## 학습 순서는 무조건 순서대로 하셔야 합니다.

- 폴더구조, 파일명 등등

### 폴더 구조

- `/src/store 폴더` 생성(전역 state 보관 장소) -`store.js` 파일 생성

  ```js
  // store 설정
  // store은 전역에서 사용할 state를 말함
  // 주로 /src/store 폴더 주로 생성.
  // store은 1개만, 즉 전역 state는 1개만 만들 수 있다.
  import { configureStore } from "@reduxjs/toolkit";

  // 파일명은 주로 store.js
  const store = configureStore({
    reducer: {
      // store을 쪼개서, 즉 slice해서 사용합니다.
    },
  });
  ```

- `/src/features/counter 폴더` 생성
  - `counterSlice.js`

## RTK 기본 예제(`순서 중요`)

```js
import { createSlice } from "@reduxjs/toolkit";

// 초기값(상태 관리할 데이터)
const initialState = { count: 0 };
// 코딩 컨벤션
// Slice는 sotre을 쪼개서 사용한다는 의미
const counterSlice = createSlice({
  // 슬라이스 구분용 이름
  name: "counterSlice", //문자열
  // 슬라이스 초기값
  initialState: initialState,
  // state 내에 저장된 값 갱신, 해당 Slice를 업데이트할 함수
  // 상태를 갱신해 주는 함수 묶음
  reducers: {
    add: state => {
      state.count += 1;
    },
    minus: state => {
      state.count -= 1;
    },
    reset: state => {
      state.count = 0;
    },
  },
});
// Reduce 함수를 외부로 내보내서 dispatch를 실행하도록 해준다.
// action: type 구분, payload 전달 ...
export const { add, minus, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

- `/src/store/store.js`

```js
// store 설정
// store은 전역에서 사용할 state를 말함
// 주로 /src/store 폴더 주로 생성.
// store은 1개만, 즉 전역 state는 1개만 만들 수 있다.

import { configureStore } from "@reduxjs/toolkit";
// 카운터용 reducer을 활용
import counterReducer from "../features/counter/counterSlice";

// 파일명은 주로 store.js
const store = configureStore({
  reducer: {
    // store을 쪼개서, 즉 slice해서 사용합니다.
    counter: counterReducer,
  },
});

export default store;
```

- `components/Counter.jsx` 생성

```jsx
import { useDispatch, useSelector } from "react-redux";
// store에 저장된 slice 중 어떤 action를 사용할 것인지
import { add, minus, reset } from "../features/counter/counterSlice";

function Counter() {
  // RTK의 store를 불러들여서 그 중 counter 사용하겠다.
  const count = useSelector(state => state.counter.value); // store의 reducer의 키와 키값를 사용
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
```

- `src/App.jsx`에 Provieder 셋팅(`전역 store 접근`)

```jsx
import { Provider } from "react-redux";
import Counter from "./components/Counter";
import store from "./store/store";

function App() {
  return (
    // 전역 store을 활용함
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
export default App;
```
