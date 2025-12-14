import React from "react";
import "./App.css";

const App = () => {
  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      id="main"
    >
      <div className="card card-principal">
        <div className="container">
          <header className="d-flex justify-content-center gap-2">
            <img src="../photos/logo.png" alt="logo" />
            <h1 className="title">Kermit Tasks</h1>
          </header>

          <section>
            <div className="tasks-progress row">
              <div className="col-6">
                <p>Tasks progreess</p>

                <div
                  class="progress"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div class="progress-bar w-25"></div>
                </div>
              </div>

              <div className="col-6">
                <div className="tasks-completed d-flex justify-content-center align-items-center">
                  <span className="fw-semibold">1/3</span>
                </div>
              </div>
            </div>

            <div className="tasks-list"></div>
          </section>

          <footer></footer>
        </div>
      </div>
    </div>
  );
};

export default App;
