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

  const [taskSelected, setTaskSelected] = useState(null);

  const [contPomodoro, setContPomodoro] = useState(1);
  const [nomeBotao, setNomeBotao] = useState("START");
  const [estaLigadoTimer, setEstaLigadoTimer] = useState(false);
  const [estaEmPausa, setEstaEmPausa] = useState(false);
  const [tempoFormatoPomodoro, setTempoFormatoPomodoro] = useState();
  const tempoCicloPomodoro = useRef(0.1);
  const tempoPausaCurta = useRef(0.1);
  const tempoPausaLonga = useRef(30);
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
          setSegundosRestante(tempoPausaLonga.current * 60);
        } else {
          setSegundosRestante(tempoPausaCurta.current * 60);
        }

        setEstaEmPausa(true);
      } else {
        setEstaEmPausa(false);
        setSegundosRestante(tempoCicloPomodoro.current * 60);
        setContPomodoro((contPomodoro) => contPomodoro + 1);

        setEstaLigadoTimer(true);
      }
    }

    setTempoFormatoPomodoro(
      String(Math.floor(segundosRestante / 60)).padStart(2, "0") +
        ":" +
        String(segundosRestante % 60).padStart(2, "0"),
    );
  }, [segundosRestante]);

  useEffect(() => {
    console.log(
      "Em pausa: ",
      estaEmPausa,
      "\n",
      "Ligado timer: ",
      estaLigadoTimer,
      "\n",
    );

    if (estaEmPausa === true) {
      setNomeBotao("SKIP");
    } else {
      if (estaLigadoTimer === true) {
        setNomeBotao("STOP");
      } else {
        setNomeBotao("START");
      }
    }

    if (estaLigadoTimer === true || estaEmPausa === true) {
      console.log("Entrou em timer ou em pausa!");
      rodarTimer();
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [estaLigadoTimer, estaEmPausa]);

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
          taskSelected={taskSelected}
          setTaskSelected={setTaskSelected}
        ></Tasks>
      )}
      {componentUsed === components[1].name && (
        <PomodoroTimer
          components={components}
          componentUsed={componentUsed}
          setComponentUsed={setComponentUsed}
          contPomodoro={contPomodoro}
          estaLigadoTimer={estaLigadoTimer}
          setEstaLigadoTimer={setEstaLigadoTimer}
          estaEmPausa={estaEmPausa}
          setSegundosRestante={setSegundosRestante}
          tempoFormatoPomodoro={tempoFormatoPomodoro}
          nomeBotao={nomeBotao}
          taskSelected={taskSelected}
          taskList={taskList}
        ></PomodoroTimer>
      )}
    </div>
  );
};

export default App;
