import React from "react";
import { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  const taskIdAtual = useRef(0);
  const taskSelection = useRef(null);

  const [taskName, setTaskName] = useState("");
  const [pomodoro, setPomodoro] = useState("");

  const [taskList, setTaskList] = useState([]);

  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    console.log(taskList);

    if (taskList.length != 0) {
      setShowPlaceholder(false);
    } else {
      setShowPlaceholder(true);
    }
  }, [taskList]);

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

  const editTask = (e) => {
    console.log(e);
    console.log(taskSelection.current.taskid);
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
      <div className="card card-principal p-3">
        <div className="container">
          <header className="d-flex justify-content-center align-items-center gap-2 mt-2">
            <img src="../photos/logo.png" alt="logo" />
            <h1 className="title">Kermit Tasks</h1>
          </header>

          <section className="d-flex justify-content-center flex-column align-items-center mt-2">
            <div className="form-group w-100">
              <form onSubmit={addTask}>
                <div className="input-group mb-3">
                  <span className="input-group-text border border-secondary">
                    📝
                  </span>
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

                <div className="input-group mb-3">
                  <span className="input-group-text border border-secondary">
                    ⏰
                  </span>
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
                    taskid={item.id}
                    ref={taskSelection}
                    className="task d-flex justify-content-between align-items-center border border-secondary rounded-4 w-100 gap-4 p-2 mt-3"
                    onClick={() => checkTask(item.id)}
                  >
                    <div className="d-flex gap-2">
                      {item.completed === false ? (
                        <i className="bi bi-circle"></i>
                      ) : (
                        <i className="bi bi-check-circle-fill"></i>
                      )}
                      <div className="task-name text-break fw-bold">
                        {item.name}
                      </div>
                    </div>

                    <div
                      className="d-flex align-items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <button
                        className="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-edit-task"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button className="btn btn-danger btn-sm">
                        <i className="bi bi-x"></i>
                      </button>

                      <div className="bg-secondary p-1 rounded-circle">
                        <span className="text-white fw-bold">
                          0/{item.pomodoros}
                        </span>
                      </div>

                      <div
                        className="modal fade"
                        id="modal-edit-task"
                        tabIndex="-1"
                        aria-labelledby="painel-editar-task"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="titulo-modal"
                              >
                                Edit task
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="input-group mb-3">
                                <span className="input-group-text border border-secondary">
                                  📝
                                </span>
                                <input
                                  type="text"
                                  className="form-control border border-secondary"
                                  placeholder="Edit the task name..."
                                />
                              </div>

                              <div className="input-group mb-3">
                                <span className="input-group-text border border-secondary">
                                  ⏰
                                </span>
                                <input
                                  type="number"
                                  className="form-control border border-secondary"
                                  placeholder="Edit the number of pomodoros"
                                  min={1}
                                />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={editTask}
                              >
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showPlaceholder && (
                <div className="d-flex justify-content-center align-items-center flex-column mt-4">
                  <img
                    src="../photos/work-order.png"
                    alt="icone-tasks"
                    id="icone-tasks"
                    className="img-fluid"
                  />
                  <span className="fw-semibold opacity-75">
                    Your tasks will be here!
                  </span>
                </div>
              )}
            </div>
          </section>

          <footer className="d-flex justify-content-center"></footer>
        </div>
      </div>
    </div>
  );
};

export default App;
