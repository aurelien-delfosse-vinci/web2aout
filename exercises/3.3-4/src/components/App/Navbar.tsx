import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return( 
    <nav>
      <button onClick={() => navigate("/")}>Home Page</button>
      <button onClick={() => navigate("/cinemaPage")}>Cinema Page</button>
      <button onClick={() => navigate("/movieListPage")}>Movie List Page</button>
    </nav>
  )
}
export default NavBar;