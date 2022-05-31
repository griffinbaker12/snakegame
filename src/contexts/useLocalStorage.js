import { createContext, useContext, useEffect, useState } from 'react';

const SessionScore = createContext();

export const useSessionScore = () => useContext(SessionScore);

export const SessionScoreProvider = ({ children }) => {
  const [sessionHighScore, setSessionHighScore] = useState(
    JSON.parse(localStorage.getItem('session-high-score')) || 0
  );

  useEffect(() => {
    localStorage.setItem(
      'session-high-score',
      JSON.stringify(sessionHighScore)
    );
  }, [sessionHighScore]);

  return (
    <SessionScore.Provider value={{ sessionHighScore, setSessionHighScore }}>
      {children}
    </SessionScore.Provider>
  );
};
