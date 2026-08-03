import Footer from "../Footer";
import Title from "../Title";
import UserCards from "../Usercards";

const App = () => {
  const title = "Welcome to My App";

  const users = [
    {
      name: "Alice",
      age: 25,
    },
    {
      name: "Bob",
      age: 30,
    },
    {
      name: "Charlie",
      age: 35,
    }
  ]
  const footerText = "© 2023 My App";

  return (
    <div>
      <Title title = {title} />
      <div>
        <UserCards users={users}/>
      </div>
    <Footer text={footerText} />
    </div>
  );
};

export default App;