import { FaStar } from "react-icons/fa6";
function App() {
  // 총점
  const point=10;
  //별점
  const rate = 3;

  return (
    <div>
    <h1>당신의 별점은: </h1>
    <div>
      {[...Array(point)].map((item, index)=>{return(<FaStar key={index} style={{fontSize:50, color: index<rate?"gold":"lightgray"}}/>)})}
    </div>
    </div>
  );
};
export default App;
