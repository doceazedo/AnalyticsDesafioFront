import { Provider } from "react-redux";
import { Game } from "./components/Game";
import { Sidebar } from "./components/Sidebar";
import { store } from "./redux/stores";

const App = () => (
  <Provider store={store}>
    <Sidebar />
    <Game />
  </Provider>
);

export default App;
