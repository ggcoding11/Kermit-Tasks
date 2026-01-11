import React from "react";
import { useState } from "react";
import Tasks from "./components/Tasks";
import PomodoroTimer from "./components/PomodoroTimer";
import "./App.css";

const components = [
  { id: 0, name: "Tasks" },
  { id: 1, name: "PomodoroTimer" },
];

const App = () => {
  const [componentUsed, setComponentUsed] = useState("Tasks");

  return (
    <div>
      {componentUsed === components[0].name && (
        <Tasks
          componentUsed={componentUsed}
          setComponentUsed={setComponentUsed}
        ></Tasks>
      )}
      {componentUsed === components[1].name && (
        <PomodoroTimer
          componentUsed={componentUsed}
          setComponentUsed={setComponentUsed}
        ></PomodoroTimer>
      )}
    </div>
  );
};

export default App;
