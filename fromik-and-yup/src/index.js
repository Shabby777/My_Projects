// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import MyForm from './MyForm'; // Import the Formik form component

const App = () => {
  return (
    <div>
      <MyForm /> {/* Display the Formik form here */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
