import './App.css';
import ChatLoop from "./components/Roleplay/ChatLoop";

function App() {
  return (
    <div className="App">
      <h1>Voxa Roleplay</h1>
      <ChatLoop scenarioId="coffee_shop" />
    </div>
  );
}

export default App;