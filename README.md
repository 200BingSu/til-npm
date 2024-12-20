# 날짜를 다루는 라이브러리

## 1. moment

### 1.1.설치

- https://momentjs.com/
- `npm i moment`

### 1.3. 활용예

```jsx
import moment from "moment";

// 서버에서 Response 된 데이터
const getData = [
  {
    id: 1,
    title: "swaggr 완료",
    createAt: "2024-12-13T10:00:00Z",
  },
  {
    id: 2,
    title: "react 완료",
    createAt: "2024-12-18T10:00:00Z",
  },
];

function App() {
  // 오늘의 날짜
  const todayMoment = moment().format("YYYY-MM-DD");
  return (
    <div>
      <h1>moment 활용 날짜관련</h1>
      <div>
        <p>오늘은 {todayMoment}</p>
        {getData.map(item => {
          return (
            <p key={item.id}>
              아이디 : {item.id} 제목 : {item.title} 날짜 :{" "}
              {moment(item.createAt).format("YYYY-MM-DD")}
            </p>
          );
        })}

        <h2>moment 를 활용한 5일 뒤 날짜 계산하기 </h2>
        {getData.map(item => {
          return (
            <p key={item.id}>
              아이디 : {item.id} 제목 : {item.title} 5일 뒤의 날짜 :{" "}
              {moment(item.createAt).add(5, "days").format("YYYY-MM-DD")}
            </p>
          );
        })}
        <h3>moment 를 활용한 시간이 얼마나 지났는지? </h3>
        {getData.map(item => {
          return (
            <p key={item.id}>
              아이디 : {item.id} 제목 : {item.title} 얼마나 지났는지 :{" "}
              {moment(item.createAt).fromNow()}
            </p>
          );
        })}
      </div>
    </div>
  );
}
export default App;
```

## 2. Dayjs

### 2.1. 설치

- [활용참조](https://velog.io/@hongsoom/Library-day.js-%EB%82%A0%EC%A7%9C-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC)

### 2.2. 활용

### 2.3. 활용 예제

```jsx
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime); //relativeTime 사용하기

// 서버에서 Response 된 데이터
const getData = [
  {
    id: 1,
    title: "swaggr 완료",
    createAt: "2024-12-13T10:00:00Z",
  },
  {
    id: 2,
    title: "react 완료",
    createAt: "2024-12-18T10:00:00Z",
  },
];

function App() {
  // 오늘의 날짜
  const todayMoment = dayjs().format("YYYY-MM-DD");
  return (
    <div>
      <h1>moment 활용 날짜관련</h1>
      <div>
        <p>오늘은 {todayMoment}</p>
        {getData.map(item => {
          return (
            <p key={item.id}>
              아이디 : {item.id} 제목 : {item.title} 날짜 :{" "}
              {dayjs(item.createAt).format("YYYY-MM-DD")}
            </p>
          );
        })}

        <h2>moment 를 활용한 5일 뒤 날짜 계산하기 </h2>
        {getData.map(item => {
          return (
            <p key={item.id}>
              아이디 : {item.id} 제목 : {item.title} 5일 뒤의 날짜 :{" "}
              {dayjs(item.createAt).add(5, "day").format("YYYY-MM-DD")}
            </p>
          );
        })}
        <h3>moment 를 활용한 시간이 얼마나 지났는지? </h3>
        {getData.map(item => {
          return (
            <p key={item.id}>
              아이디 : {item.id} 제목 : {item.title} 얼마나 지났는지 :{" "}
              {dayjs(item.createAt).fromNow()}
            </p>
          );
        })}
      </div>
    </div>
  );
}
export default App;
```
