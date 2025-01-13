# Recoil

- 장점 : context state 관리가 참 쉽다.
- 단점 : 업데이트가 없다. (개발자 퇴사)
- https://recoiljs.org/ko/
- `npm i recoil`

## 코딩 컨벤션

- `/src/atoms 폴더` 생성
  : `/src/states 폴더` 생성을 하는 경우도 있어요.
- `/src/selectors 폴더` 생성
  : 만들지 않기도 함.

## 기초 코드

### 1. atoms 폴더에 atom 파일 만들기

- atom 은 각각의 state 를 정의하는 것.
- `/src/atoms/counterAtom.js 파일` 생성

```js
import { atom } from "recoil";

export const counterAtom = atom({
  key: "counterAtom", // state 를 구분하는 키
  default: 0, // 초기값
});
export const loginAtom = atom({
  key: "loginAtom",
  default: false,
});
```

- `main.jsx 에 RecoilRoot 설정`

```jsx
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // 전연 store 를 활용함.
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
```

- `src/components/CounterAtom.jsx 활용`

```jsx
import { useRecoilState } from "recoil";
import { counterAtom, loginAtom } from "../atoms/counterAtom";

const CounterAtom = () => {
  const [count, setCount] = useRecoilState(counterAtom);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  return (
    <div>
      <h1>로그인상태: {isLogin ? "로그인중" : "로그아웃 중"}</h1>
      <button onClick={() => setIsLogin(true)}>로그인</button>
      <button onClick={() => setIsLogin(false)}>로그아웃</button>
      <h1>CounterAtom : {count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>
    </div>
  );
};
export default CounterAtom;
```

## 응용예제(Todo)

- `/src/atoms/TodoListAtoms.js` 생성

```js
import { atom } from "recoil";

export const todoListAtom = atom({
  key: "todoListAtom", // atom 구분 문자열 즉, 키값
  default: [], // 기본 할일 배열의 목록
});
```

- `/src/components/TodoListAtom.jsx 파일` 활용예

```jsx
import { useRecoilState } from "recoil";
import { todoListAtom } from "../atoms/TodoListAtom";
import { useState } from "react";

function TodoListAtom() {
  const [todos, setTodos] = useRecoilState(todoListAtom);
  const [inputValue, setInputValue] = useState("");
  //   할일 추가
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), title: inputValue, completed: false },
      ]);
    }
    setInputValue("");
  };
  // 할일 삭제
  const deleteTodo = id => {
    setTodos(todos.filter(item => item.id !== id));
  };
  const toggleTodo = id => {
    setTodos(
      todos.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };
  return (
    <div>
      <h1>TodoListAtom</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={() => addTodo()}>추가</button>
        <ul>
          {/* 목록출력 */}
          {todos.map(item => (
            <li key={item.id}>
              <p
                onClick={() => toggleTodo(item.id)}
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.title}
              </p>
              <button onClick={() => deleteTodo(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default TodoListAtom;
```

### Selector를 이용한 데이터 변경 및 필터링 작업

- `/src/selectors/todoSelector.js` 파일 생성

```js
import { selector } from "recoil";
import { todoListAtom } from "../atoms/todoListAtom";

//  Recoil에서 관리하는 데이터에서 완료된 항목만 필터링해서 출력해 보기
export const completedTodoListSelector = selector({
  key: "completedTodoListSelector",
  get: ({ get }) => {
    const todoList = get(todoListAtom);
    return todoList.filter(item => item.completed === true);
  },
});
```

- `/src/components/TodoListSelector.jsx`

```jsx
import { useRecoilValue } from "recoil";
import { completedTodoListSelector } from "../selectors/todoSelector";

function TodoListSelector() {
  // todos Atoms에서 completed:true만 가져오기
  const completedTodoList = useRecoilValue(completedTodoListSelector);
  return (
    <div>
      <h1>TodoListSelector</h1>
      <ul>
        {completedTodoList.map(item => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}
export default TodoListSelector;
```

## 응용 예제(쇼핑몰 장바구니)

- `/src/atoms/cartAtom.js`
- `/src/atoms/productAtom.js`

### selectors

- `/src/selectors/cartSelectors.js`

```js
import { selector } from "recoil";
import { cartAtom } from "../atoms/cartAtom";
import { productAtom } from "../atoms/productAtom";
import { produce } from "immer";

// 총금액
export const cartTatalPriceSelector = selector({
  key: "cartTatalPrice",
  get: ({ get }) => {
    const cart = get(cartAtom);
    const products = get(productAtom);
    return cart.reduce((acc, item) => {
      const product = product.find(pro => item.id === pro.id);
      // 전체 합산이 필요하다.
      // 현재까지 금액 + (제품 가격)*장바구니 수량
      return acc + product.price * item.qty;
    }, 0);
  },
});

// 장바구니 수량
export const cartTatalCountSelector = selector({
  key: "cartTatalCount",
  get: ({ get }) => {
    const cart = get(cartAtom);
    return cart.reduce((total, item) => {
      return total + item.qty;
    }, 0);
  },
});
```

### 활용하기

-`/src/components/product` 폴더

- ProductLsit.jsx

```jsx
import { useRecoilValue } from "recoil";
import { productAtom } from "../../atoms/productAtom";
import ProductItem from "./ProductItem";

function ProductList() {
  const productList = useRecoilValue(productAtom);
  return (
    <div>
      <h1>제품 리스트</h1>
      <div>
        {productList.map(item => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
export default ProductList;
```

- ProductItem.jsx

```jsx
import { useRecoilState } from "recoil";
import { cartAtom } from "../../atoms/cartAtom";

/* eslint-disable react/prop-types */
function ProductItem({ product }) {
  const [cart, setCart] = useRecoilState(cartAtom);
  const addCart = id => {
    // id를 전달받으면 cart에 제품 id와 qty 업데이트
    setCart(prevCart => {
      // 현재 카트에 있을 경우
      const existId = prevCart.find(item => item.id === id);
      if (existId) {
        return prevCart.map(item =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      // 없을 경우
      return [...prevCart, { id: id, qty: 1 }];
    });
  };
  return (
    <div style={{ display: "flex" }}>
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
      <button type="button" onClick={() => addCart(product.id)}>
        장바구니 담기
      </button>
    </div>
  );
}
export default ProductItem;
```

-`/src/components/cart` 폴더

- CartList.jsx

- CartItem.jsx

```jsx
import { useRecoilState, useRecoilValue } from "recoil";
import { productAtom } from "../../atoms/productAtom";
import { cartAtom } from "../../atoms/cartAtom";

/* eslint-disable react/prop-types */
function CartItem({ item }) {
  const [cartList, setCartList] = useRecoilState(cartAtom);
  const productList = useRecoilValue(productAtom);
  const product = productList.find(prd => prd.id === item.id);
  const removeCart = id => {
    setCartList([...cartList].filter(prd => prd.id !== id));
  };
  return (
    <div>
      <h3>제품 이름: {product.name}</h3>
      <p>수량: {item.qty}</p>
      <p>가격: {(product.price * item.qty).toLocaleString()} 원</p>
      <button
        type="button"
        onClick={() => {
          removeCart(item.id);
        }}
      >
        삭제
      </button>
    </div>
  );
}
export default CartItem;
```

- `/src/components/cart/CartSummary.jsx`
