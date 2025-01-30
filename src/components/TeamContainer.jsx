import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveName } from "../features/teamSlice";
import DraggableName from "./DraggableName";

const TeamContainer = ({ teamIndex, members }) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "NAME",
    drop: (item) =>
      dispatch(
        moveName({
          name: item.name,
          fromTeam: item.fromTeam,
          toTeam: teamIndex,
        })
      ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        border: "2px dashed gray",
        padding: "16px",
        margin: "8px",
        backgroundColor: isOver ? "lightgreen" : "white",
        minHeight: "100px",
      }}
    >
      <h3>Team {teamIndex + 1}</h3>
      {members.map((name) => (
        <DraggableName key={name} name={name} fromTeam={teamIndex} />
      ))}
    </div>
  );
};

export default TeamContainer;
