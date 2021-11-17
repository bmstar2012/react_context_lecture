import React from 'react';
import './App.css';
import { CountProvider } from './context/count';
import { CountLabel } from './components/CountLabel';
import { PlusButton } from './components/PlusButton';

function App() {
  return (
      <CountProvider>
        <CountLabel />
        <PlusButton />
      </CountProvider>
  );
}

export default App;
