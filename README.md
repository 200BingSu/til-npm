# Swiper 활용

## 1. 설치

- `npm install swiper`

## 2. 관련문서

- https://swiperjs.com/
- https://swiperjs.com/react
- https://swiperjs.com/demos

## 3. 예제

- App.jsx

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./slide.css";
function App() {
  return (
    <div>
      <h1>Swiper</h1>
      <div className="visual-slide">
        <Swiper className="sw-visual">
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
export default App;
```

- slide.css

```css
.visual-slide {
  position: relative;
  width: 80%;
  height: 400px;
  margin: 0 auto;
  background-color: skyblue;
}
.sw-visual {
  width: 100%;
  height: 100%;
}
```

- loop 와 navigation 적용 예제

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./slide.css";

// css 와 모듈 확인
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function App() {
  return (
    <div>
      <h1>Swiper</h1>
      <div className="visual-slide">
        <Swiper
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="sw-visual"
        >
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
export default App;
```

## 4. api 연동 Swiper 슬라이드 만들기
