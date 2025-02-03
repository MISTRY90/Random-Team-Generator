import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { moveName, deleteTeam, renameTeam } from '../features/teamSlice';
import DraggableName from './DraggableName';
import {
  Paper,
  Typography,
  IconButton,
  TextField,
  Box,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TeamContainer = ({ teamIndex }) => {
  const dispatch = useDispatch();
  const team = useSelector(state => state.team.teams[teamIndex]);
  const names = useSelector(state => state.team.names);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(team.name);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'NAME',
    drop: (item) => dispatch(moveName({
      id: item.id,
      fromTeam: item.fromTeam,
      toTeam: teamIndex
    })),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleNameChange = () => {
    if (newName.trim() !== '') {
      dispatch(renameTeam({
        index: teamIndex,
        newName: newName.trim()
      }));
    }
    setEditingName(false);
  };

  return (
    <Paper
      ref={drop}
      elevation={3}
      sx={{
        p: 2,
        m: 1,
        minWidth: 250,
        backgroundColor: isOver ? 'action.hover' : 'background.paper',
        transition: 'background-color 0.3s ease',
        position: 'relative',
        border: isOver ? '1px solid' : '1px solid transparent',
        borderColor: 'primary.main'
      }}
    >
      {/* Team Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 ,width:400}}>
        {editingName ? (
          <TextField
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleNameChange}
            onKeyPress={(e) => e.key === 'Enter' && handleNameChange()}
            autoFocus
            size="small"
            sx={{ mr: 1 }}
            InputProps={{
              style: {
                color: 'text.primary'
              }
            }}
          />
        ) : (
          <Typography
            variant="h6"
            onClick={() => setEditingName(true)}
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
              mr: 1,
              color: 'text.primary'
            }}
          >
            {team.name}
          </Typography>
        )}
        <Chip
          label={`${team.members.length} members`}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ color: 'text.secondary' }}
        />
        <IconButton
          onClick={() => setEditingName(!editingName)}
          size="small"
          sx={{ ml: 1, color: 'text.secondary' }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Delete Button */}
      <IconButton
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this team?')) {
            dispatch(deleteTeam(teamIndex));
          }
        }}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'error.main'
        }}
      >
        <DeleteIcon />
      </IconButton>

      {/* Team Members */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {team.members.map((id) => {
          const nameEntry = names.find(n => n.id === id);
          return (
            <DraggableName 
              key={id}
              id={id}
              name={nameEntry?.name || ''}
              fromTeam={teamIndex}
            />
          );
        })}
      </Box>
    </Paper>
  );
};
export default TeamContainer;
