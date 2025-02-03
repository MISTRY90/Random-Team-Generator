import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addName, deleteName } from '../features/teamSlice';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const NameInput = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const names = useSelector((state) => state.team.names);

  const handleAdd = () => {
    if (name.trim() !== '') {
      dispatch(addName(name));
      setName('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Team Members
      </Typography>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <TextField
          label="Enter name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!name.trim()}
          sx={{ width: 1/4 }}        >
          Add
        </Button>
      </div>

      <Typography variant="h6" gutterBottom>
        Members List
      </Typography>
      <List dense>
        {names.map((n) => (
          <ListItem
            key={n.id}
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => dispatch(deleteName(n.id))}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={n.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default NameInput;