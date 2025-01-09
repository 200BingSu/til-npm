import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todoSlice",
  // 최초로 보관할 데이터
  initialState: initialState,
  // reducer 함수: store의 slice의 state 갱신
  // state는 slice에 보관하고 있는 데이터
  // action은 state에 업데이트할 자료
  reducers: {
    // action에 담겨질 내용 {id:Date.now(), title: "안녕하세요", completed: false}
    addTodo: (state, action) => {
      state.push({ id: Date.now(), title: action.payload, completed: false });
    },
    // action id:Date.now()
    toggleTodo: (state, action) => {
      // 배열.find는 true인 요소를 찾는다.
      const todo = state.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // action id:Date.now()
    deleteTodo: (state, action) => {
      state.filter(item => item.id !== action.payload);
    },
  },
});

//dispatch action 함수 내보내기
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
// 기본 리듀서 내보내기
export default todoSlice.reducer;
