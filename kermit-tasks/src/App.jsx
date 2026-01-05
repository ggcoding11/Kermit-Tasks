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
      <div className="card card-principal p-4">
        <div className="container">
          <header className="d-flex justify-content-center align-items-center gap-2 mt-2">
            <img src="../photos/logo.png" alt="logo" />
            <h1 className="title">Kermit Tasks</h1>
          </header>

          <section className="d-flex justify-content-center flex-column align-items-center mt-2">
            <div className="form-group w-100">
              <form onSubmit={addTask}>
                <div className="mb-3">
                  <input
                    type="text"
                    name=""
                    id="task-name"
                    className="form-control border border-secondary"
                    onChange={(e) => {
                      setTaskName(e.target.value);
                    }}
                    value={taskName}
                    placeholder="Write the task name..."
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    name=""
                    id="pomodoro-number"
                    min={1}
                    className="form-control border border-secondary"
                    onChange={(e) => {
                      setPomodoro(e.target.value);
                    }}
                    value={pomodoro}
                    placeholder="How many pomodoros?"
                    required
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary w-100">
                    Add task
                  </button>
                </div>
              </form>
            </div>

            <div className="tasks-list w-100">
              <div className="d-flex justify-content-center align-items-center flex-column">
                {taskList.map((item) => (
                  <div
                    key={item.id}
                    className="task d-flex justify-content-between align-items-center border border-secondary rounded w-100 gap-4 p-2 mt-3"
                    onClick={() => checkTask(item.id)}
                  >
                    <div className="d-flex gap-2">
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
