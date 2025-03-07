# Framer Motion

- https://motion.dev/docs/react-quick-start
- https://velog.io/@keumky1/Framer-Motion-입문하기
- https://nykim.work/114
- https://examples.motion.dev/react

## 설치하기

```bash
npm install framer-motion
```

## 실습하기

- /src/pages/Framer.jsx

```jsx
import { motion } from "framer-motion";
import { useState } from "react";
const Framer = () => {
  const [visisible, setVisible] = useState(false);
  return (
    <div>
      <h1>Framer Motion</h1>
      <button onClick={() => setVisible(!visisible)}>실행</button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visisible ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "red",
          borderRadius: 10,
        }}
      >
        애니메이션용 DIV
      </motion.div>
    </div>
  );
};
export default Framer;
```

```jsx
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
```

```jsx
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
```
