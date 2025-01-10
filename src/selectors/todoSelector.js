import { selector } from "recoil";
import { todoListAtom } from "../atoms/todoListAtom";

//  Recoil에서 관리하는 데이터에서 완료된 항목만 필터링해서 출력해 보기
export const completedTodoListSelector = selector({
  key: "completedTodoListSelector",
  get: ({ get }) => {
    const todoList = get(todoListAtom);
    return todoList.filter(item => item.completed === true);
  },
});
