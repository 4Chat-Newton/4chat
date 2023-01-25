import React from 'react';
import SignUp from './components/FormComponent';
import Login from './components/RegisterForm';
// import Report from './components/reportForm'

function App() {
  return (
    <body>
      <div>
        <header>
          <>
            <SignUp></SignUp>
            <Login></Login>
            {/* <Report></Report> */}
          </>
        </header>
      </div>
    </body>
  );
}

export default App;
