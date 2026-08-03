const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";
  const cinema1Movie1Title = "Film 1 - DeBrouckère";
  const cinema1Movie1Director = "Director A";
  const cinema1Movie2Title = "Film 2 - DeBrouckère";
  const cinema1Movie2Director = "Director B";

  const cinema2Name = "UGC Toison d'Or";
  const cinema2Movie1Title = "Film 1 - Toison d'Or";
  const cinema2Movie1Director = "Director C";
  const cinema2Movie2Title = "Film 2 - Toison d'Or";
  const cinema2Movie2Director = "Director D";

  return (
    <div>

      <PageTitle title={pageTitle} />

      <Cinema cinemaName={cinema1Name} 
              movie1Name={cinema1Movie1Title} 
              movie1Director={cinema1Movie1Director}
              movie2Name={cinema1Movie2Title}
              movie2Director={cinema1Movie2Director}
      />

      <Cinema cinemaName={cinema2Name} 
              movie1Name={cinema2Movie1Title} 
              movie1Director={cinema2Movie1Director}
              movie2Name={cinema2Movie2Title}
              movie2Director={cinema2Movie2Director}
      />
    </div>
  );
};

interface PageTitleProps {
  title:string;
}
const PageTitle = (props: PageTitleProps) => {
  return (
    <h1>{props.title}</h1>
  )
}

interface CinemaProps {
  cinemaName:string;
  movie1Name:string;
  movie1Director:string;
  movie2Name:string;
  movie2Director:string;
}

const Cinema = (props:CinemaProps) => {
  return (
    <div>
        <h2>{props.cinemaName}</h2>
        <ul>
          <li>
            <strong>{props.movie1Name}</strong> - Réalisateur :{" "}
            {props.movie1Director}
          </li>
          <li>
            <strong>{props.movie2Name}</strong> - Réalisateur :{" "}
            {props.movie2Director}
          </li>
        </ul>
      </div>
  )
}

export default App; 