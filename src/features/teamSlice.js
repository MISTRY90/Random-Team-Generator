import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  names: [], // Stores entered names
  teams: [], // Stores generated teams
  isGenerated: false, // Tracks if teams have been generated
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addName: (state, action) => {
      state.names.push(action.payload);
    },
    generateTeams: (state, action) => {
      const numTeams = action.payload;
      const shuffledNames = [...state.names].sort(() => Math.random() - 0.5);
      state.teams = Array.from({ length: numTeams }, () => []);

      shuffledNames.forEach((name, index) => {
        state.teams[index % numTeams].push(name);
      });

      state.isGenerated = true; // Teams are now generated
    },
    resetTeams: (state) => {
    //   state.names = [];
      state.teams = [];
      state.isGenerated = false; // Reset flag
    },
    moveName: (state, action) => {
      const { name, fromTeam, toTeam } = action.payload;
      state.teams[fromTeam] = state.teams[fromTeam].filter((n) => n !== name);
      state.teams[toTeam].push(name);
    },
  },
});

export const { addName, generateTeams, resetTeams, moveName } = teamSlice.actions;
export default teamSlice.reducer;
