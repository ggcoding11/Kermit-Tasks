import { useEffect, useState, useRef } from "react";
import somBotao from "../assets/sounds/somBotao.mp3";
import ComponentSelector from "./ComponentSelector";
import "./PomodoroTimer.css";

const PomodoroTimer = ({
  components,
  componentUsed,
  setComponentUsed,
  contPomodoro,
  estaLigadoTimer,
  setEstaLigadoTimer,
  estaEmPausa,
  setSegundosRestante,
  tempoFormatoPomodoro,
  nomeBotao,
  taskSelected,
  taskList,
  resetarTimer,
}) => {
  const somClique = useRef(new Audio(somBotao));

  const clicarBotaoStartStop = () => {
    somClique.current.currentTime = 0;
    somClique.current.play();

    if (estaEmPausa === false) {
      setEstaLigadoTimer(!estaLigadoTimer);
    } else {
      setSegundosRestante(0);
    }
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 py-4 main">
      <div className="row mb-3">
        <div className="col-12 text-center">
          <h1 className="text-white fw-bold">
            <span>⏰</span>
            Pomodoro Timer
          </h1>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {taskSelected != null &&
          taskList.map((task) => {
            if (task.id === taskSelected) {
              return (
                <div
                  key={task.id}
                  className="actual-task d-flex justify-content-between align-items-center bg-light border border-secondary border-2 rounded p-2 mb-4"
                >
                  <div
                    className={
                      "fw-bold " +
                      (task.completed === true &&
                        "text-decoration-line-through")
                    }
                  >
                    {task.name}
                  </div>
                  <div className="bg-secondary p-1 rounded-circle">
                    <span className="text-white fw-bold">
                      {task.count}/{task.pomodoros}
                    </span>
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div className="d-flex justify-content-center gap-3 mb-4">
        <ComponentSelector
          components={components}
          componentUsed={componentUsed}
          setComponentUsed={setComponentUsed}
        ></ComponentSelector>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div
            className={
              estaEmPausa === false
                ? "circulo-externo d-flex justify-content-center align-items-center em-timer"
                : "circulo-externo d-flex justify-content-center align-items-center em-pausa"
            }
          >
            <div className="container-timer d-flex justify-content-center align-items-center">
              <span className="text-center text-white fw-bold" id="timer">
                {tempoFormatoPomodoro}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <span
            className="text-white fw-bold"
            onClick={() => {
              if (confirm("Wanna reset the count?")) {
                resetarTimer();
              }
            }}
          >
            #{contPomodoro}
          </span>
        </div>
      </div>
      <div className="row row-buttons mt-4">
        <div className="col-12 d-flex justify-content-center gap-2">
          <button
            onClick={clicarBotaoStartStop}
            className="btn text-white fw-semibold"
            id="start-stop"
          >
            {nomeBotao}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
