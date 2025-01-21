import { ConfigProvider } from "antd";
import JoinForm from "./components/JoinForm";
import { useState } from "react";
import PwForm from "./components/PwForm";

// const ThemeData = {
//   token: {
//     colorPrimary: "#0DD1FD",
//     colorSecondary1: "#FFF600", // Secondary 1
//     colorSecondary2: "#6B4AD6", // Secondary 2
//     colorSecondary3: "#FB653D", // Secondary 3
//   },
//   Button: {
//     colorPrimary: "#02AED5",
//     colorPrimaryHover: "#A5EEFE",
//     colorSecondary1: "#CCC500", // Secondary 1
//     colorSecondary1Hover: "#FFFDCC",
//     colorSecondary2: "#4F2CC1", // Secondary 2
//     colorSecondary3: "#FA3D0B", // Secondary 3
//   },
// };

// const ThemeData = {
//   token: {
//     colorPrimary: "#0DD1FD",
//     colorSecondary1: "#FFF600", // Secondary 1
//     colorSecondary2: "#6B4AD6", // Secondary 2
//     colorSecondary3: "#FB653D", // Secondary 3
//   },
//   components: {
//     Button: {
//       colorPrimary: "#02AED5",
//       colorPrimaryHover: "#A5EEFE",
//       boxShadow: "none",
//       boxShadowSecondary: "none",
//     },
//   },
// };
const ThemeData = {
  token: {
    colorPrimary: "#0DD1FD",
  },
};

function App() {
  const [data, setData] = useState(ThemeData);
  return (
    <ConfigProvider theme={data}>
      {/* <JoinForm theme={data} /> */}
      <PwForm />
    </ConfigProvider>
  );
}
export default App;
