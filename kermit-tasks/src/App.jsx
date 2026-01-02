import React from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [task, setTask] = useState("");
  const [pomodoro, setPomodoro] = useState(1);

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
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add task
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Add a new task
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="task-name" className="form-label">
                          Task name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="task-name"
                          value={task}
                          onChange={(e) => {
                            setTask(e.target.value);
                          }}
                        />
                      </div>

                      <div className="w-100">
                        <label htmlFor="pomodoro-number" className="form-label">
                          Pomodoro number
                        </label>
                        <input
                          type="number"
                          name=""
                          id="pomodoro-number"
                          min={1}
                          value={pomodoro}
                          onChange={(e) => {
                            setPomodoro(e.target.value);
                          }}
                          className="form-control w-25"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer d-flex justify-content-center">
                    <button type="button" className="btn btn-primary w-75">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
