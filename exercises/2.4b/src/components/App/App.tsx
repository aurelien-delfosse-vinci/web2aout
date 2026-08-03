import './App.css'
import UserCard from '../UserCard'

function App() {
  
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
        <UserCard
          name="Alice"
          age={22}
          isOnline={true}
        />

        <UserCard
          name="Bob"
          age={31}
          isOnline={false}
        />

        <UserCard
          name="Charlie"
          age={27}
          isOnline={true}
        />
    </div>
  );
};

export default App;
