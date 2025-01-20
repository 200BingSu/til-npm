import { ConfigProvider } from "antd";
import JoinForm from "./components/JoinForm";
import { useState } from "react";

const ThemeData = {
  token: {
    colorPrimary: "#0DD1FD",
    colorSecondary1: "#FFF600", // Secondary 1
    colorSecondary2: "#6B4AD6", // Secondary 2
    colorSecondary3: "#FB653D", // Secondary 3
  },
  Button: {
    colorPrimary: "#02AED5",
    colorSecondary1: "#CCC500", // Secondary 1
    colorSecondary2: "#4F2CC1", // Secondary 2
    colorSecondary3: "#FA3D0B", // Secondary 3
  },
};

function App() {
  const [data, setData] = useState(ThemeData);
  return (
    <ConfigProvider theme={data}>
      <JoinForm theme={data} />
    </ConfigProvider>
  );
}
export default App;
