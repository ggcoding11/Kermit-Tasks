import React from "react";
import { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const taskIdAtual = useRef(0);

  const [taskName, setTaskName] = useState("");
  const [pomodoro, setPomodoro] = useState("");

  const [taskList, setTaskList] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    setTaskList([
      ...taskList,
      {
        id: taskIdAtual.current++,
        name: taskName,
        pomodoros: pomodoro,
        completed: false,
      },
    ]);

    console.log(taskList);
    setTaskName("");
    setPomodoro("");
  };

  const checkTask = (taskId) => {
    let novaLista = taskList.map((item) => {
      if (item.id === taskId) {
        item.completed = !item.completed;
      }

      return item;
    });

    setTaskList(novaLista);
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
            <div className="form-group w-100 mb-3">
              <form onSubmit={addTask}>
                <h3>Add task</h3>
                <div className="mb-3">
                  <label htmlFor="task-name" className="form-label">
                    Task name:
                  </label>
                  <input
                    type="text"
                    name=""
                    id="task-name"
                    className="form-control"
                    onChange={(e) => {
                      setTaskName(e.target.value);
                    }}
                    value={taskName}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="pomodoro-number" className="form-label">
                    Pomodoro number:
                  </label>
                  <input
                    type="number"
                    name=""
                    id="pomodoro-number"
                    min={1}
                    className="form-control"
                    onChange={(e) => {
                      setPomodoro(e.target.value);
                    }}
                    value={pomodoro}
                    required
                  />
                </div>

                <div className="d-flex justify-content-center mb-3">
                  <button type="submit" className="btn btn-primary w-75">
                    Add
                  </button>
                </div>
              </form>
            </div>

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

            <div className="tasks-list w-100">
              <div className="d-flex justify-content-center align-items-center flex-column">
                {taskList.map((item) => (
                  <div
                    key={item.id}
                    className="task d-flex justify-content-between p-2 mb-2 w-50"
                    onClick={() => checkTask(item.id)}
                  >
                    <div className="d-flex gap-3">
                      {item.completed === false ? (
                        <i className="bi bi-circle"></i>
                      ) : (
                        <i className="bi bi-check-circle-fill"></i>
                      )}
                      <span>{item.name}</span>
                    </div>

                    <div className="d-flex gap-2">
                      <button className="btn btn-primary btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button className="btn btn-danger btn-sm">
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="d-flex justify-content-center"></footer>
        </div>
      </div>
    </div>
  );
};

export default App;
