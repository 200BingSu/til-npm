import axios from "axios";
import { useState } from "react";

const App = () => {
  const [file, setFile] = useState(null);
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      // 보내야 하는 데이터
      const sendData = {
        email: "1234park@naver.com",
        upw: "1111",
        name: "홍길동",
        phone: "01012345678",
      };
      formData.append(
        "p",
        new Blob([JSON.stringify(sendData)], { type: "application/json" }),
      );
      if (file) {
        formData.append("pic", file);
      }

      const res = await axios.post("/api/user/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = e => {
    console.log(e.target.files.FileList[0]);
  };

  return (
    <div>
      <h1>File 및 json 데이터 post 테스트</h1>
      <input type="file" name="" id="" onClick={e => handleClick(e)} />
      <button onClick={() => handleSubmit()}>업로드</button>
    </div>
  );
};
export default App;
