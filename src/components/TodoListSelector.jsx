import { useRecoilValue } from "recoil";
import { completedTodoListSelector } from "../selectors/todoSelector";

function TodoListSelector() {
  // todos Atoms에서 completed:true만 가져오기
  const completedTodoList = useRecoilValue(completedTodoListSelector);
  return (
    <div>
      <h1>TodoListSelector</h1>
      <ul>
        {completedTodoList.map(item => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}
export default TodoListSelector;
