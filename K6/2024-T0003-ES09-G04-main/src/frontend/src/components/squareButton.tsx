// SmallSquareButton.tsx
import React from 'react';

interface SmallSquareButtonProps {
  color: string;
  number: number; // Substitua children por number
}

const SmallSquareButton: React.FC<SmallSquareButtonProps> = ({ color, number }) => {
  const buttonStyle = {
    backgroundColor: color,
  };

  return (
    <button style={buttonStyle} className="w-14 h-14 rounded-md mb-10">
      <span className="text-white font-bold">{number}</span>
    </button>
  );
};

export default SmallSquareButton;
