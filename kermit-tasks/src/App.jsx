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
  const [tempoFormatoPomodoro, setTempoFormatoPomodoro] = useState();
  const tempoCicloPomodoro = useRef(0.1);
  const tempoPausaCurta = 0.1;
  const tempoPausaLonga = 30;
  const timer = useRef(null);
  const [segundosRestante, setSegundosRestante] = useState();

  const [componentUsed, setComponentUsed] = useState(components[0].name);

  const rodarTimer = () => {
    timer.current = setInterval(() => {
      setSegundosRestante((segundosRestante) => segundosRestante - 1);
    }, 1000);
  };

  useEffect(() => {
    setSegundosRestante(tempoCicloPomodoro.current * 60);
  }, []);

  useEffect(() => {
    if (segundosRestante === 0) {
      if (estaLigadoTimer === true) {
        setEstaLigadoTimer(false);
        if (contPomodoro % 4 === 0) {
          setSegundosRestante(tempoPausaLonga * 60);
        } else {
          setSegundosRestante(tempoPausaCurta * 60);
        }

        setEstaEmPausa(true);
      } else {
        setEstaEmPausa(false);
        setSegundosRestante(tempoCicloPomodoro * 60);
        setContPomodoro((contPomodoro) => contPomodoro + 1);

        setEstaLigadoTimer(true);
      }
    }

    setTempoFormatoPomodoro(
      String(Math.floor(segundosRestante / 60)).padStart(2, "0") +
        ":" +
        String(segundosRestante % 60).padStart(2, "0")
    );
  }, [segundosRestante]);

  return (
    <div>
      {segundosRestante}

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
          tempoCicloPomodoro={tempoCicloPomodoro.current}
          timer={timer}
          rodarTimer={rodarTimer}
          tempoFormatoPomodoro={tempoFormatoPomodoro}
          setTempoFormatoPomodoro={setTempoFormatoPomodoro}
          tempoPausaCurta={tempoPausaCurta}
          tempoPausaLonga={tempoPausaLonga}
        ></PomodoroTimer>
      )}
    </div>
  );
};

export default App;
