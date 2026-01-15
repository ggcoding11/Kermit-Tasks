import { useEffect, useState, useRef } from "react";
import somBotao from "../assets/sounds/somBotao.mp3";
import ComponentSelector from "./ComponentSelector";
import "./PomodoroTimer.css";

const PomodoroTimer = ({
  components,
  componentUsed,
  setComponentUsed,
  contPomodoro,
  setContPomodoro,
  estaLigadoTimer,
  setEstaLigadoTimer,
  estaEmPausa,
  setEstaEmPausa,
  segundosRestante,
  setSegundosRestante,
  tempoCicloPomodoro,
  timer,
  rodarTimer,
  tempoFormatoPomodoro,
  setTempoFormatoPomodoro,
  tempoPausaCurta,
  tempoPausaLonga,
}) => {
  const [nomeBotao, setNomeBotao] = useState("START");

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

  useEffect(() => {
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
      if (timer.current === null) {
        rodarTimer();
      } 
    }
  }, [estaLigadoTimer, estaEmPausa]);

  return (
    <div className="container-fluid vh-100 py-4 main">
      <div className="row mb-3">
        <div className="col-12 text-center">
          <h1 className="text-white fw-bold">
            <span>⏰</span>
            Pomodoro Timer
          </h1>
        </div>
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
          <span className="text-white fw-bold">#{contPomodoro}</span>
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
