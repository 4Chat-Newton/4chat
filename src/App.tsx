import React from 'react';
import SignUp from './components/FormComponent';
import Login from './components/RegisterForm';

function App() {
  return (
    <body>
      <div>
        <header>
          <>
            <SignUp></SignUp>
            <Login></Login>
          </>
        </header>
      </div>
    </body>
  );
}

export default App;
