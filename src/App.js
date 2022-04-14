import logo from "./logo.svg";
import "./App.css";
import Tetromino from "./components/Tetromino";

function App() {
  return (
    <div className="container">
      <div className="board">
        <Tetromino/>
        <div className="item"></div>
      </div>
    </div>
  );
}

export default App;