import { useState } from "react";
import "./App.css";
import AddedList from "./components/added-list";
import CreateForm from "./components/create-form";

function App() {
  const [state, setState] = useState({
    added_list: [],
    filter: "",
    filter_data: [],
  });
  return (
    <div className='App'>
      <div className='main-container'>
        <CreateForm setState={setState} />
        <AddedList state={state} setState={setState} />
      </div>
    </div>
  );
}

export default App;
