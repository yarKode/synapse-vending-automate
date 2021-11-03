import "./App.css";
import Automate from "./components/Automate";
import RefillInterface from "./components/RefillInterface";
import { Provider } from "react-redux";
import { store } from "./store/index";

function App() {
  return (
    <div className="App">
      <h1>Vending Automate: Buy Dev Skills Here</h1>
      <Provider store={store}>
        <Automate />
        <RefillInterface />
      </Provider>
    </div>
  );
}

export default App;
