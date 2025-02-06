# 구글 로그인

## 과정

- 과정 1
  ![Image](https://github.com/user-attachments/assets/63b66acc-03d4-4286-be25-0e420c6b8149)
- 새 프로젝트 생성 및 사용자 인증 정보 추가
  ![Image](https://github.com/user-attachments/assets/8834aa0f-f688-4cea-a45b-32283776f081)
  ![Image](https://github.com/user-attachments/assets/cecae858-9c80-4a4d-8183-e5f05ebf4e4c)
  ![Image](https://github.com/user-attachments/assets/4d781b68-9467-4d5b-8410-fab5e53fa768)
  ![Image](https://github.com/user-attachments/assets/be2ec7af-c9a6-440f-b431-aff2fadd6f9c)
  ![Image](https://github.com/user-attachments/assets/c4df98c7-db73-4226-9fc6-d797db46cecf)
  ![Image](https://github.com/user-attachments/assets/56aa156e-f541-4b92-9484-728e8833d9a6)
  ![Image](https://github.com/user-attachments/assets/c8cfb4e6-8fae-4065-9dc5-261f90e2702b)
  ![Image](https://github.com/user-attachments/assets/58b22a09-dae7-41b3-82cc-8f2bf55838c1)
  ![Image](https://github.com/user-attachments/assets/11307ab6-6a33-44d3-92c1-a299b9ce8bd7)
  ![Image](https://github.com/user-attachments/assets/d2586f22-56d4-413a-b53c-fdc3ebc6b2cb)
  ![Image](https://github.com/user-attachments/assets/4d0aae73-3f2f-4e9f-95ff-31a19210f9d7)
  ![Image](https://github.com/user-attachments/assets/91faf8bb-3e01-429b-820d-a3ab38c0921b)
  ![Image](https://github.com/user-attachments/assets/f9b3f33e-96f1-49db-8fbd-83c21edc4e71)

## router 구성

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";
import After from "./pages/member/After";
import GoogleAfter from "./pages/member/GoogleAfter";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/join" element={<Join />} />
        <Route path="/member/kko" element={<After />} />
        <Route path="/member/google" element={<GoogleAfter />} />

        <Route path="/login" element={<h1>로그인</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
```

## 인가 키 처리

- `src/pages/member/GoogleAfter.jsx`
