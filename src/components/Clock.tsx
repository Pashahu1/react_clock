import React from 'react';

type Props = {
  currentTime: string;
};
export const Clock: React.FC<Props> = ({ currentTime }) => {
  return <span className="Clock__time">{currentTime}</span>;
};
