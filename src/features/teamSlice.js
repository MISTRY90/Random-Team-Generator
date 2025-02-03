import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  names: [], // Array of { id: string, name: string }
  teams: [], // Now array of { name: string, members: string[] }
  isGenerated: false,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addName: (state, action) => {
      const newName = action.payload;
      const isDuplicate = state.names.some(n => n.name === newName);
      if (!isDuplicate) {
        state.names.push({
          id: Date.now() + Math.random(),
          name: newName
        });
      }
    },
    
    generateTeams: (state, action) => {
      const numTeams = action.payload;
      const nameIds = state.names.map(n => n.id);
      
      // Fisher-Yates shuffle
      for (let i = nameIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nameIds[i], nameIds[j]] = [nameIds[j], nameIds[i]];
      }
      
      // Create teams with default names
      state.teams = Array.from({ length: numTeams }, (_, i) => ({
        name: `Team ${i + 1}`,
        members: []
      }));
      
      // Distribute names
      nameIds.forEach((id, index) => {
        const teamIndex = index % numTeams;
        state.teams[teamIndex].members.push(id);
      });
      
      state.isGenerated = true;
    },

    renameTeam: (state, action) => {
      const { index, newName } = action.payload;
      if (state.teams[index]) {
        state.teams[index].name = newName;
      }
    },
    resetTeams: (state) => {
      // state.names = [];
      state.teams = [];
      state.isGenerated = false;
    },
    deleteName: (state, action) => {
      const idToDelete = action.payload;
      // Remove from names
      state.names = state.names.filter(name => name.id !== idToDelete);
      // Remove from all teams
      state.teams = state.teams.map(team => 
        team.filter(memberId => memberId !== idToDelete)
      );
    },

    deleteTeam: (state, action) => {
      const teamIndex = action.payload;
      state.teams = state.teams.filter((_, index) => index !== teamIndex);
      state.isGenerated = state.teams.length > 0;
    },

    moveName: (state, action) => {
      const { id, fromTeam, toTeam } = action.payload;
      // Remove from source team
      state.teams[fromTeam].members = state.teams[fromTeam].members.filter(
        memberId => memberId !== id
      );
      // Add to target team
      state.teams[toTeam].members.push(id);
    },
  },
});

export const { addName, generateTeams,renameTeam, resetTeams, deleteName, deleteTeam ,moveName } = teamSlice.actions;
export default teamSlice.reducer;