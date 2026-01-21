import React from "react";
import "./ComponentSelector.css"

const ComponentSelector = ({ components, componentUsed, setComponentUsed }) => {
  return (
    <>
      {components.map((item) => (
        <div key={item.id}>
          <input
            type="radio"
            name="options-base"
            className="btn-check"
            id={item.name}
            value={item.name}
            autoComplete="off"
            checked={componentUsed === item.name}
            onChange={(e) => setComponentUsed(e.target.value)}
          />

          <label className="btn btn-outline-success" htmlFor={item.name}>
            {item.name}
          </label>

          <div>
            <button className="botao">{item.name}</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ComponentSelector;
