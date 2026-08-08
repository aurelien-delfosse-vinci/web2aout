import { useNavigate } from "react-router-dom";
import type { MaybeAuthenticatedUser } from "../../types";


interface NavBarProps{
  authenticatedUser: MaybeAuthenticatedUser;
  clearUser: () => void;
}
const NavBar = ({authenticatedUser, clearUser}: NavBarProps) => {
  const navigate = useNavigate();
  if(authenticatedUser){
    return(
      <nav>
        <button onClick={() => navigate("/")}>Home Page</button>
      <button onClick={() => navigate("/cinemaPage")}>Cinema Page</button>
      <button onClick={() => navigate("/movieListPage")}>Movie List Page</button>
      <button onClick={() => clearUser()}>Se déconnecter</button>
      </nav>
    )
  }
  return( 
    <nav>
      <button onClick={() => navigate("/")}>Home Page</button>
      <button onClick={() => navigate("/cinemaPage")}>Cinema Page</button>
      <button onClick={() => navigate("/movieListPage")}>Movie List Page</button>
      <button onClick={() => navigate("/register")}>Créer un compte</button>
      <button onClick={() => navigate("/login")}>Se connecter</button>
    </nav>
  );
};
export default NavBar;