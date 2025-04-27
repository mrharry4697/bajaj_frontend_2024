import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResponseDisplay from './components/ResponseDisplay';
import './components/styles.css'; 

function App() {
  const [response, setResponse] = useState(null);

  return (
    <div className="App">
      <h1>Your Roll Number: 0827CS221295</h1>
      <InputForm setResponse={setResponse} />
      <ResponseDisplay response={response} />
    </div>
  );
}

export default App;
