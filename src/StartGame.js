import React from 'react';

const SelectWordLength = ({ onSelectWordLength }) => {
  const handleWordLengthChange = (event) => {
    const newWordLength = event.target.value;
    onSelectWordLength(newWordLength);
  };

  return (
    <div>
      <label htmlFor="word-length">Word length:</label>
      <select id="word-length" onChange={handleWordLengthChange}>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
    </div>
  );
};

export default SelectWordLength;
