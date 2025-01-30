import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateTeams, resetTeams } from "./features/teamSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NameInput from "./components/NameInput";
import TeamContainer from "./components/TeamContainer";

const App = () => {
  const dispatch = useDispatch();
  const { names, teams, isGenerated } = useSelector((state) => state.team);
  const [numTeams, setNumTeams] = useState(2);

  return (
    <DndProvider backend={HTML5Backend}>
      <h2>Randomized Team Generator</h2>

      {/* Input Section */}
      <NameInput />
      
      <div>
        <label>Number of Teams: </label>
        <input
          type="number"
          value={numTeams}
          onChange={(e) => setNumTeams(parseInt(e.target.value))}
        />
        <button onClick={() => dispatch(generateTeams(numTeams))}>Generate Teams</button>
        <button onClick={() => dispatch(resetTeams())}>Reset</button>
      </div>

      {/* Show teams only after clicking "Generate Teams" */}
      {isGenerated && (
        <div style={{ display: "flex", gap: "16px" }}>
          {teams.map((members, index) => (
            <TeamContainer key={index} teamIndex={index} members={members} />
          ))}
        </div>
      )}
    </DndProvider>
  );
};

export default App;
