import React from "react";
import { useDrag } from "react-dnd";

const DraggableName = ({ name, fromTeam }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "NAME",
    item: { name, fromTeam },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: "8px",
        margin: "4px",
        backgroundColor: "lightblue",
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {name}
    </div>
  );
};

export default DraggableName;
