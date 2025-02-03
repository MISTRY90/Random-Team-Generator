import React from 'react';
import { useDrag } from 'react-dnd';
import { Paper, Typography } from '@mui/material';

const DraggableName = ({ id, name, fromTeam }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NAME',
    item: { id, fromTeam },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Paper
      ref={drag}
      elevation={1}
      sx={{
        p: 1,
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        transition: 'opacity 0.3s ease',
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
    >
      <Typography variant="body2">{name}</Typography>
    </Paper>
  );
};

export default DraggableName;