
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; 

const InputForm = ({ setResponse }) => {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate JSON
      const parsedData = JSON.parse(inputData);

      if (Array.isArray(parsedData.data)) {
        const response = await axios.post('https://bajaj-api-test2024.onrender.com/bfhl', {
          data: parsedData.data,
          file_b64: parsedData.file_b64 || '', // Optional, if file is included
        });
        setResponseData(response.data);  // Store response data here
        setResponse(response.data); // If you need to set response for parent component too
      } else {
        setError('Invalid JSON format or missing data field.');
      }
    } catch (err) {
      setError('Invalid JSON format.');
    }
  };

  return (
    <div>
      <h2>Enter JSON Data</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputData}
          onChange={handleInputChange}
          rows="10"
          cols="50"
          placeholder='{"data": ["A", "B", "1"], "file_b64": "BASE64STRING"}'
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the Response Data */}
      {responseData && (
        <div>
          <h3>Response Data</h3>

          <h4>User Info:</h4>
          <p>User ID: {responseData.user_id}</p>
          <p>Email: {responseData.email}</p>
          <p>Roll Number: {responseData.roll_number}</p>

          <h4>Numbers:</h4>
          <select>
            {responseData.numbers.map((num, index) => (
              <option key={index} value={num}>
                {num}
              </option>
            ))}
          </select>

          <h4>Alphabets:</h4>
          <select>
            {responseData.alphabets.map((alpha, index) => (
              <option key={index} value={alpha}>
                {alpha}
              </option>
            ))}
          </select>

          <h4>Highest Lowercase Alphabet:</h4>
          <select>
            {responseData.highest_lowercase_alphabet.map((letter, index) => (
              <option key={index} value={letter}>
                {letter}
              </option>
            ))}
          </select>

          <h4>Is Prime Found?</h4>
          <p>{responseData.is_prime_found ? 'Yes' : 'No'}</p>

          {responseData.file_valid && (
            <div>
              <h4>File Details:</h4>
              <p>File Type: {responseData.file_mime_type}</p>
              <p>File Size: {responseData.file_size_kb} KB</p>
              <a href={responseData.file_download_url} download>Download File</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputForm;
