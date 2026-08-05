import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './components/App'
import HomePage from './components/Pages/HomePage'
import CinemaPage from './components/Pages/CinemaPage'
import MovieListPage from './components/Pages/MovieListPage'
import AddMoviePage from './components/Pages/AddMoviePage'


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
  }

    ]
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router ={router} />
  </StrictMode>,
)
