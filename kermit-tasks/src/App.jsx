import React from "react";
import { useState } from "react";
import Tasks from "./components/Tasks";
import "./App.css";

const components = [
  { id: 0, name: "Tasks" },
  { id: 1, name: "Pomodoro Timer" },
];

const [componentUsed, setComponentUsed] = useState("Tasks");

const App = () => {
  return (
    <div>
      {componentUsed === "Tasks" && <Tasks></Tasks>}
      {componentUsed === "Pomodoro Timer" && <PomodoroTimer></PomodoroTimer>}
    </div>
  );
};

export default App;
