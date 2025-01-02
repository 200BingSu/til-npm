import { Provider } from "react-redux";
import Counter from "./components/Counter";
import store from "./store/store";

function App() {
  return (
    // 전역 store을 활용함
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
export default App;
