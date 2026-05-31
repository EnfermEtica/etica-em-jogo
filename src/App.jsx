import React, { useState } from 'react';
import SetupScreen from './components/SetupScreen';
import GameScreen  from './components/GameScreen';
import { TEAM_COLORS } from './data';

export default function App() {
  const [teams, setTeams] = useState(null);

  const handleStart = (names) => {
    setTeams(names.map((name, i) => ({ name, color: TEAM_COLORS[i] })));
  };

  if (!teams) return <SetupScreen onStart={handleStart} />;
  return <GameScreen teams={teams} onRestart={() => setTeams(null)} />;
}
