import { useEffect } from "react";
import axiosInstance from "./apis/fetch";

function App() {
  const loginApi = async () => {
    try {
      const res = await axiosInstance.post(`/api/user/sign-in`, {
        email: "qgq0520@naver.com",
        upw: "1234",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loginApi();
  }, []);

  return <div>App</div>;
}
export default App;
