import { useEffect, useState } from 'react';

function App() {
  const makeApiCall = async () => {
    try{
      const response = await fetch('http://localhost:8080/cors', {mode:'cors'});
      const data = await response.json();
      console.log({data});
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(()=>{
    makeApiCall();
  }, [])
  return (
    <div className='App'>
      <header >
        <h1>Hello World</h1>
      </header>
    </div>
  );
}

export default App;
