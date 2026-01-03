import React from "react";
import { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [taskName, setTaskName] = useState("");
  const [pomodoro, setPomodoro] = useState("");

  let tasks = [
    { name: "Task 1", pomodoros: 3 },
    { name: "Task 2", pomodoros: 2 },
    { name: "Task 3", pomodoros: 1 },
  ];

  const addTask = () => {
    console.log(tasks);
    tasks.push({ name: taskName, pomodoros: pomodoro });
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      id="main"
    >
      <div className="card card-principal">
        <div className="container">
          <header className="d-flex gap-2">
            <img src="../photos/logo.png" alt="logo" />
            <h1 className="title">Kermit Tasks</h1>
          </header>

          <section className="d-flex justify-content-center flex-column align-items-center mt-4">
            <div className="task-progress bg-secondary p-2">
              <div className="row">
                <div className="col-9 d-flex justify-content-center align-items-center">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div className="progress-bar w-50"></div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="tasks-completed d-flex justify-content-center align-items-center">
                    <span className="fw-bold">1/3</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="tasks-list mt-4">
              <ul>
                <li className="bg-secondary">Task 1</li>
                <li className="bg-secondary">Task 2</li>
                <li className="bg-secondary">Task 3</li>
              </ul>
            </div>
          </section>

          <footer className="d-flex justify-content-center">
          
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
