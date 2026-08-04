import { useState } from 'react'
import './App.css'


const colors = ["red", "green", "blue", "yellow", "purple"];
const ColorBox = () => {
  const [currentColor, setColor] = useState(0);

  const nextColor = () => {
    setColor((currentColor + 1) % colors.length);
  };

  return(
    <div style={{backgroundColor:colors[currentColor]}}>
      <button onClick={nextColor}>
        {colors[(currentColor + 1) % colors.length]}
      </button>

      <p>Couleur Actuelle : {colors[currentColor]}</p>
    </div>
  )
}
function App() {
  return (
      <div className="card">
        <ColorBox/>
        <ColorBox/>
        <ColorBox/>
      </div>
  )
}

export default App
