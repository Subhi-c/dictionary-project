import { useState } from "react";
import "./App.css";
import Resultcomponent from "./components/Resultcomponent";
import Titlecomponent from "./components/Titlecomponent";
function App() {
  const [searchText, setsearchText] = useState("");
  const [text, settext] = useState(false);
  function setTrue() {
    settext(true);
  }
  function handleChange(e) {
    setsearchText(e.target.value);
    settext(false);
  }
  return (
    <>
      <Titlecomponent />
      <div className="d-flex">
        <div>
          <input
            value={searchText}
            type="text"
            onChange={handleChange}
            placeholder="Type word here"
          />
          <button onClick={setTrue}>Search</button>
        </div>
        {text && <Resultcomponent Text={searchText} />}
      </div>
    </>
  );
}

export default App;
