import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateTeams, resetTeams } from './features/teamSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NameInput from './components/NameInput';
import TeamContainer from './components/TeamContainer';
import { 
  Typography,
  Container, 
  Box, 
  TextField, 
  Button, 
  Alert,
  ThemeProvider,
  CssBaseline
} from '@mui/material';
import theme from './theme';

const App = () => {
  const dispatch = useDispatch();
  const { names, teams, isGenerated } = useSelector((state) => state.team);
  const [numTeams, setNumTeams] = useState(2);
  const [error, setError] = useState('');

  const handleGenerate = () => {
    if (names.length === 0) {
      setError('Please add names before generating teams.');
      return;
    }
    if (numTeams > names.length) {
      setError('Number of teams cannot be greater than the number of names.');
      return;
    }
    setError('');
    dispatch(generateTeams(numTeams));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              textAlign: 'center',
              mb: 4,
              background: 'linear-gradient(45deg, #90caf9 30%, #f48fb1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Random Team Generator
          </Typography>
          
          <NameInput />
          
          <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="Number of Teams"
              type="number"
              value={numTeams}
              onChange={(e) => setNumTeams(parseInt(e.target.value))}
              size="small"
              sx={{ width: 150 }}
            />
            <Button
              variant="contained"
              onClick={handleGenerate}
              disabled={names.length === 0}
            >
              Generate Teams
            </Button>
            <Button
              variant="outlined"
              onClick={() => dispatch(resetTeams())}
            >
              Reset
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {isGenerated && (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {teams.map((team, index) => (
                <TeamContainer key={index} teamIndex={index} />
              ))}
            </Box>
          )}
        </Container>
      </DndProvider>
    </ThemeProvider>
  );
};

export default App;