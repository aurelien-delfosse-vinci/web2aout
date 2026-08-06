import { useEffect, useRef, useState } from "react";
import "./App.css";

interface DogResponse {
  message: string;
  status: string;
}

const RandomDog = () => {
  const [image, setImage] = useState("");
  const isHoveredRef = useRef(false);

  const handleMouseEnter = () => {
    isHoveredRef.current =true;
   
  }
  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  }

  const fetchDog = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`,
        );

      const dog: DogResponse = await response.json();
      setImage(dog.message);
    } catch (err) {
      console.log("RandomDog::error: ", err);
    }
  };

  useEffect(() => {
    fetchDog();

    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        fetchDog();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!image) return <p>Chargement...</p>;

  return (
    <div>
      <img
        src={image}
        alt="Random dog"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        width={250}
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
};

function App() {
  return (
    <>
      <div>
        <h1>Random Dogs 🐶</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <RandomDog />
          <RandomDog />
          <RandomDog />
        </div>
      </div>
    </>
  );
}

export default App;
