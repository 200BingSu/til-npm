import { Button } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
const Framer = () => {
  const [visible, setVisible] = useState(false);
  const [move, setMove] = useState(false);
  const [rot, setRot] = useState(false);
  return (
    <div className="flex flex-col px-20 gap-10">
      <h1>Framer Motion</h1>
      <Button onClick={() => setRot(!rot)}>실행</Button>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: rot ? 360 : 0 }}
        transition={{ duration: 1 }}
        drag
        dragConstraints={{ left: 0, right: 500, top: -100, bottom: 500 }}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#00FFDE",
          borderRadius: 10,
        }}
      >
        애니메이션용 DIV
      </motion.div>
    </div>
  );
};
export default Framer;
