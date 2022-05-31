import { useState } from 'react';
import { useSessionScore } from './contexts/useLocalStorage';

import './App.css';
import Board from './components/board/board.component';

function App() {
  const [score, setScore] = useState(0);
  const { sessionHighScore, setSessionHighScore } = useSessionScore();

  return (
    <div className="App">
      <Board
        score={score}
        setScore={setScore}
        sessionHighScore={sessionHighScore}
        setSessionHighScore={setSessionHighScore}
      />
    </div>
  );
}

export default App;
