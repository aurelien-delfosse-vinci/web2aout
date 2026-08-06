
import { useEffect, useState } from 'react';
import './App.css'

interface DogResponse {
  message:string;
  status: string;
}

const RandomDog = () => {
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchDog();
  }, []);

  const fetchDog = async () => {
    try{
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if(!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

      const dog:DogResponse = await response.json();
      setImage(dog.message);
      
    }catch(err){
      console.log("RandomDog::error: ", err);
    }
    
  }

  if(!image) return <p>Chargement...</p>

  return(
    <div>
      <img src={image} alt="Random dog" width={250} style={{borderRadius: "10px"}} />
    </div>
  );
};


function App() {
  const[refresh, setRefresh] = useState(0);


  return (
    <>
      <div>
        <h1>Random Dogs 🐶</h1>
        <div>
          <RandomDog key={`${refresh}-1`}/>
          <RandomDog key={`${refresh}-2`}/>
          <RandomDog key={`${refresh}-3`}/>
        </div>
        <button onClick={() => setRefresh(refresh+1)}>Rafraichir</button>
      </div>
      
    </>
  )
}

export default App
