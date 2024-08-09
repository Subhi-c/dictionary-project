import { useState } from "react";
import "./App.css";
import Resultcomponent from "./components/Resultcomponent";
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
      <input value={searchText} type="text" onChange={handleChange} />
      <button onClick={setTrue}>Search</button>
      {text && <Resultcomponent Text={searchText} />}
    </>
  );
}

export default App;
