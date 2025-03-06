import anime from "animejs";
import { Button } from "antd";
import { useEffect, useRef } from "react";

const AniPage = () => {
  const BoxWrap = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80vh",
    backgroundColor: "yellowgreen",
    position: "reative",
  };
  const BoxStyle = {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "red",
  };
  // 만약 html일 경우 querySelector(". class")
  const boxRef = useRef(null);
  const motionA = () => {
    anime({
      targets: boxRef.current,
      left: "240px",
      backgroundColor: "#FFF",
      borderRadius: ["0%", "50%"],
      easing: "easeInOutQuad",
    });
  };
  const motionB = () => {
    anime({
      targets: boxRef.current,
      scale: 5,
      duration: 2000,
      backgroundColor: "#0F0",
    });
  };
  const motionC = () => {
    anime({
      targets: boxRef.current,
      scale: 1,
      left: 0,
      duration: 2000,
      backgroundColor: "#F00",
    });
  };
  useEffect(() => {
    const box = boxRef.current;
  }, []);
  return (
    <div>
      <h1>AniPage</h1>
      <div>
        <Button onClick={motionA}>효과1</Button>
        <Button onClick={motionB}>효과2</Button>
        <Button onClick={motionC}>효과3</Button>
      </div>
      <div style={BoxWrap}>
        <div style={BoxStyle} ref={boxRef}></div>
      </div>
    </div>
  );
};
export default AniPage;
