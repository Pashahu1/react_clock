import React, { useEffect, useState } from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [hasClock, setHasClock] = useState<boolean>(true);
  const [clockName, setClockName] = useState<string>('Clock-0');
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toUTCString().slice(-12, -4),
  );

  useEffect(() => {
    const timeUpdaterId = setInterval(() => {
      setCurrentTime(new Date().toUTCString().slice(-12, -4));
      if (hasClock) {
        // eslint-disable-next-line no-console
        console.log(new Date().toUTCString().slice(-12, -4));
      }
    }, 1000);

    const timerId = window.setInterval(() => {
      setClockName(prevName => {
        const newName = getRandomName();

        if (hasClock) {
          // eslint-disable-next-line no-console
          console.warn(`Renamed from ${prevName} to ${newName}`);
        }

        return newName;
      });
    }, 3300);

    const timer = (event: MouseEvent) => {
      if (!hasClock && event.type === 'click') {
        setClockName(getRandomName());

        return setHasClock(true);
      }

      event.preventDefault();

      return setHasClock(false);
    };

    document.addEventListener('contextmenu', timer);

    if (!hasClock) {
      document.addEventListener('click', timer);
    }

    return () => {
      document.removeEventListener('contextmenu', timer);
      document.removeEventListener('click', timer);
      clearInterval(timerId);
      clearInterval(timeUpdaterId);
    };
  }, [hasClock]);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && (
        <div className="Clock">
          <strong className="Clock__name">{clockName}</strong>

          {' time is '}

          <Clock currentTime={currentTime} />
        </div>
      )}
    </div>
  );
};
