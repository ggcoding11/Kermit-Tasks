import React from "react";

const ComponentSelector = ({ components, componentUsed, setComponentUsed }) => {
  return (
    <>
      {components.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => setComponentUsed(item.name)}
            className={
              "btn-3d selector " +
              (componentUsed == item.name && "checked")
            }
          >
            {item.name}
          </button>
        </div>
      ))}
    </>
  );
};

export default ComponentSelector;
