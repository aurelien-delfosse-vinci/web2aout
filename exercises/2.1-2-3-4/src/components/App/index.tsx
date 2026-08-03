import Cinema from "../Cinema";
import Footer from "../Footer";
import Header from "../Header";
import PageTitle from "../PageTitle";

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";
  const image = "https://unsplash.com/photos/a-lamb-logo-on-a-black-background-ze5wHM9kplc";

  const cinema1Name = "UGC DeBrouckère";

  const moviesCinema1 = [
  {
    title: "HAIKYU-THE DUMPSTER BATTLE",
    director: "Susumu Mitsunaka",
  },
  {
    title: "GOODBYE JULIA",
    director: "Mohamed Kordofani",
  },
  {
    title: "INCEPTION",
    director: "Christopher Nolan",
  },
  {
    title: "PARASITE",
    director: "Bong Joon-ho",
  },
];

const cinema2Name = "UGC Toison d'Or";

const moviesCinema2 = [
  {
    title: "THE WATCHERS",
    director: "Ishana Night Shyamalan",
  },
  {
    title: "BAD BOYS: RIDE OR DIE",
    director: "Adil El Arbi, Bilall Fallah",
  },
  {
    title: "TENET",
    director: "Christopher Nolan",
  },
  {
    title: "THE IRISHMAN",
    director: "Martin Scorsese",
  },
]; 

  
  return (
    <div>
      
      <Header image={image}>
        <PageTitle title={pageTitle} />
      </Header>

      <Cinema name={cinema1Name} movies= {moviesCinema1} />

      <Cinema name={cinema2Name} movies={moviesCinema2} />
      <Footer image={image}>
        <p>© 2026 - Application Cinéma</p>
      </Footer>
    </div>
  );
};

export default App; 