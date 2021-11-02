import "./App.css";
import Automate from "./components/Automate";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <div className="App">
      <h1>Vending Automate: Buy Dev Skills Here</h1>
      <Provider store={store}>
        <Automate />
      </Provider>
    </div>
  );
}

export default App;
