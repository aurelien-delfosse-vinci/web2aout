import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface ClickCounterProps {
  title: string;
  message: string;
  hoverMessage: string;
}
const ClickCounter = ({title, message, hoverMessage}:ClickCounterProps) => {
  const [count, setCount] = useState(0);
  const [isHover, setIsHover] = useState(false);

  return(
    <div>

      <h2>{title}</h2>

      {isHover && <p>{hoverMessage}</p>}
      <button 
        onClick={() => setCount((count) => count + 1)}  
        onMouseEnter ={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        Count is {count}
      </button>

      {count >= 10 && <p>{message}</p>}

    </div>
  );
};

function App() {
  
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <ClickCounter 
        title="Click Counter" 
        message='You are a master in the art of clicking !'
        hoverMessage='Please click on me now !'
        />

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App