import React, { useEffect, useState } from 'react';

type Props = {
  clockName: string;
};

export const Clock: React.FC<Props> = ({ clockName }) => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toUTCString().slice(-12, -4),
  );

  useEffect(() => {
    const timeUpdaterId = setInterval(() => {
      setCurrentTime(new Date().toUTCString().slice(-12, -4));
      // eslint-disable-next-line no-console
      console.log(new Date().toUTCString().slice(-12, -4));
    }, 1000);

    return () => {
      clearInterval(timeUpdaterId);
    };
  }, []);

  return (
    <div className="Clock">
      <strong className="Clock__name">{clockName}</strong>

      {' time is '}
      <span className="Clock__time">{currentTime}</span>
    </div>
  );
};
