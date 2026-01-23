import React, { use } from "react";
import { useState, useRef, useEffect } from "react";
import Tasks from "./components/Tasks.jsx";
import PomodoroTimer from "./components/PomodoroTimer.jsx";
import ComponentSelector from "./components/ComponentSelector.jsx";
import "./App.css";
import somTimer from "./assets/sounds/somTimer.mp3";

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

  const timerSound = useRef(new Audio(somTimer));

  const notificationPermission = useRef(null);

  const rodarTimer = () => {
    timer.current = setInterval(() => {
      setSegundosRestante((segundosRestante) => segundosRestante - 1);
    }, 1000);
  };

  const resetarTimer = () => {
    setSegundosRestante(tempoCicloPomodoro.current * 60);
    setEstaLigadoTimer(false);
    setEstaEmPausa(false);
    setContPomodoro(1);
  };

  const iniciarPausa = () => {
    setEstaLigadoTimer(false);
    if (contPomodoro % 4 === 0) {
      setSegundosRestante(tempoPausaLonga.current * 60);
    } else {
      setSegundosRestante(tempoPausaCurta.current * 60);
    }

    setEstaEmPausa(true);

    if (notificationPermission.current === "granted") {
      const notification = new Notification("Break time!", {
        body: "Relax a little bit...",
      });
    }

    tocarSom();
  };

  const terminarPausa = () => {
    setEstaEmPausa(false);
    setSegundosRestante(tempoCicloPomodoro.current * 60);
    setContPomodoro((contPomodoro) => contPomodoro + 1);

    if (taskSelected != null) {
      setTaskList(
        taskList.map((task) => {
          if (task.id === taskSelected) {
            task.count += 1;

            if (task.count == task.pomodoros) {
              task.completed = true;
            }
          }

          return task;
        }),
      );
    }

    setEstaLigadoTimer(true);

    if (notificationPermission.current === "granted") {
      const notification = new Notification("Back to work!", {
        body: "Now it's time to focus",
      });
    }

    tocarSom();
  };

  const tocarSom = () => {
    timerSound.current.currentTime = 4;
    timerSound.current.play();
  };

  useEffect(() => {
    setSegundosRestante(tempoCicloPomodoro.current * 60);

    Notification.requestPermission().then((response) => {
      notificationPermission.current = response;
    });
  }, []);

  useEffect(() => {
    if (segundosRestante === 0) {
      if (estaLigadoTimer === true) {
        iniciarPausa();
      } else {
        terminarPausa();
      }
    }

    setTempoFormatoPomodoro(
      String(Math.floor(segundosRestante / 60)).padStart(2, "0") +
        ":" +
        String(segundosRestante % 60).padStart(2, "0"),
    );
  }, [segundosRestante]);

  useEffect(() => {
    if (estaEmPausa === true) {
      setNomeBotao("Skip");
    } else {
      if (estaLigadoTimer === true) {
        setNomeBotao("Stop");
      } else {
        setNomeBotao("Start");
      }
    }

    if (estaLigadoTimer === true || estaEmPausa === true) {
      rodarTimer();
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [estaLigadoTimer, estaEmPausa]);

  return (
    <div>
      {componentUsed === components[0].name && (
        <Tasks
          taskList={taskList}
          setTaskList={setTaskList}
          taskIdAtual={taskIdAtual}
          taskName={taskName}
          setTaskName={setTaskName}
          taskPomodoros={taskPomodoros}
          setTaskPomodoros={setTaskPomodoros}
          taskSelected={taskSelected}
          setTaskSelected={setTaskSelected}
          ComponentSelector={
            <ComponentSelector
              components={components}
              componentUsed={componentUsed}
              setComponentUsed={setComponentUsed}
            ></ComponentSelector>
          }
        ></Tasks>
      )}
      {componentUsed === components[1].name && (
        <PomodoroTimer
          contPomodoro={contPomodoro}
          estaLigadoTimer={estaLigadoTimer}
          setEstaLigadoTimer={setEstaLigadoTimer}
          estaEmPausa={estaEmPausa}
          setSegundosRestante={setSegundosRestante}
          tempoFormatoPomodoro={tempoFormatoPomodoro}
          nomeBotao={nomeBotao}
          taskSelected={taskSelected}
          taskList={taskList}
          resetarTimer={resetarTimer}
          ComponentSelector={
            <ComponentSelector
              components={components}
              componentUsed={componentUsed}
              setComponentUsed={setComponentUsed}
            ></ComponentSelector>
          }
        ></PomodoroTimer>
      )}
    </div>
  );
};

export default App;
