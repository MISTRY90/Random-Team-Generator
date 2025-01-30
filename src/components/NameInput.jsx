import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addName } from "../features/teamSlice";

const NameInput = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const names = useSelector((state) => state.team.names); // Get names from Redux

  const handleAdd = () => {
    if (name.trim() !== "") {
      dispatch(addName(name));
      setName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add Name</button>

      {/* Display names as they are added */}
      <div>
        <h3>Names List</h3>
        <ul>
          {names.map((n, index) => (
            <li key={index}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NameInput;
