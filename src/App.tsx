import './App.scss';
import { Clock } from './components/Clock';
import React, { useEffect, useState } from 'react';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [hasClock, setHasClock] = useState<boolean>(true);
  const [clockName, setClockName] = useState<string>('Clock-0');

  useEffect(() => {
    const timerId = window.setInterval(() => {
      const newName = getRandomName();

      if (hasClock) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setClockName(prev => {
          // eslint-disable-next-line no-console
          console.warn(`Renamed from ${prev} to ${newName}`);
        });
      }

      setClockName(newName);
    }, 3300);

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      setHasClock(false);
    };

    const handleClick = () => {
      setHasClock(true);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      clearInterval(timerId);
    };
  }, [hasClock]);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && <Clock clockName={clockName} />}
    </div>
  );
};
