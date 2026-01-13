import React, { use } from "react";
import { useState, useRef, useEffect } from "react";
import Tasks from "./components/Tasks";
import PomodoroTimer from "./components/PomodoroTimer";
import "./App.css";

const components = [
  { id: 0, name: "Tasks" },
  { id: 1, name: "Pomodoro Timer" },
];

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const taskIdAtual = useRef(0);
  const [taskName, setTaskName] = useState("");
  const [taskPomodoros, setTaskPomodoros] = useState("");

  const [contPomodoro, setContPomodoro] = useState(1);
  const [estaLigadoTimer, setEstaLigadoTimer] = useState(false);
  const [estaEmPausa, setEstaEmPausa] = useState(false);

  const tempoCicloPomodoro = useRef(25);

  const timer = useRef(null);

  const rodarTimer = () => {
    timer.current = setInterval(() => {
      setSegundosRestante((segundosRestante) => segundosRestante - 1);
    }, 1000);
  };

  useEffect(() => {
    setSegundosRestante(tempoCicloPomodoro.current * 60);
  }, []);

  const [segundosRestante, setSegundosRestante] = useState();

  const [componentUsed, setComponentUsed] = useState(components[0].name);

  return (
    <div>
      {componentUsed === components[0].name && (
        <Tasks
          components={components}
          componentUsed={componentUsed}
          setComponentUsed={setComponentUsed}
          taskList={taskList}
          setTaskList={setTaskList}
          taskIdAtual={taskIdAtual}
          taskName={taskName}
          setTaskName={setTaskName}
          taskPomodoros={taskPomodoros}
          setTaskPomodoros={setTaskPomodoros}
        ></Tasks>
      )}
      {componentUsed === components[1].name && (
        <PomodoroTimer
          components={components}
          componentUsed={componentUsed}
          setComponentUsed={setComponentUsed}
          contPomodoro={contPomodoro}
          setContPomodoro={setContPomodoro}
          estaLigadoTimer={estaLigadoTimer}
          setEstaLigadoTimer={setEstaLigadoTimer}
          estaEmPausa={estaEmPausa}
          setEstaEmPausa={setEstaEmPausa}
          segundosRestante={segundosRestante}
          setSegundosRestante={setSegundosRestante}
          tempoCicloPomodoro={tempoCicloPomodoro}
          timer={timer}
          rodarTimer={rodarTimer}
        ></PomodoroTimer>
      )}
    </div>
  );
};

export default App;
