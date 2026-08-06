import { useEffect, useState} from 'react'
import './App.css'

interface Joke {
  category:string;
  type:string;
  joke:string;
};

function App() {
  const [joke, setJoke] = useState<Joke | null>(null); 
  
  
  useEffect(() => {

    fetch("https://v2.jokeapi.dev/joke/Any?type=single")
    .then((response) => {
      if(!response.ok)
        throw new Error(`Fetch error : ${response.status} : ${response.statusText}`);
      return response.json();
    }).then((joke) => setJoke(joke))
    .catch((err) => {
      console.error("HomePage::error : ", err);
    })
  }, []);

  if(!joke) return <p>Chargement...</p>

  return (

    <>
      <div>
        <h1>Random Joke</h1>
        <h2>Category</h2>
        <p>{joke.category}</p>

        <h2>Joke</h2>
        <p>{joke.joke}</p>
        
      </div>
      
    </>
  )
}

export default App
