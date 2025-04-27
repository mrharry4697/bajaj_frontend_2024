import React, { useState } from 'react';

const ResponseDisplay = ({ response }) => {
  const [filter, setFilter] = useState([]);
  
  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter(value.split(','));
  };

  const getFilteredData = (filter) => {
    const data = {};
    if (filter.includes('Numbers')) data.numbers = response.numbers;
    if (filter.includes('Alphabets')) data.alphabets = response.alphabets;
    if (filter.includes('Highest lowercase alphabet')) data.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    return data;
  };

  if (!response) return null;

  return (
    <div>
      <h2>Filtered Response</h2>
      <select multiple onChange={handleFilterChange}>
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      <div>
        {Object.keys(getFilteredData(filter)).map((key) => (
          <div key={key}>
            <strong>{key}:</strong> {JSON.stringify(getFilteredData(filter)[key])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseDisplay;
