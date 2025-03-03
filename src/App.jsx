import "../src/index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
