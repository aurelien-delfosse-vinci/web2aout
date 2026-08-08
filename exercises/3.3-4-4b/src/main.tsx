import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './components/App'
import HomePage from './components/Pages/HomePage'
import CinemaPage from './components/Pages/CinemaPage'
import MovieListPage from './components/Pages/MovieListPage'
import AddMoviePage from './components/Pages/AddMoviePage'
import MoviePage from './components/Pages/MoviePage'
import RegisterPage from './components/Pages/RegisterPage'
import LoginPage from './components/Pages/LoginPage'
import EditMoviePage from './components/Pages/EditMoviePage'


const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {
    path:"/",
    element: <HomePage />
  },
  {
    path:"/cinemaPage",
    element: <CinemaPage />
  },
  {
    path:"/movieListPage",
    element: <MovieListPage />
  },
  {
    path:"/addMoviePage",
    element: <AddMoviePage />
  },
  {
    path:"/movies/:movieId",
    element: <MoviePage />,
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/update/:id",
    element: <EditMoviePage />
  }
    ]
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router ={router} />
  </StrictMode>,
)
