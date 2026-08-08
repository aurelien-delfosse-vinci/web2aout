import { useState, type SyntheticEvent } from "react";
import type { MovieContext } from "../../types";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const EditMoviePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateMovie }: MovieContext = useOutletContext();
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);

  const movieId = Number(id);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    updateMovie(movieId, {
      title: title,
      director: director,
      duration: duration,
      imageUrl: image,
      description: description,
      budget: budget,
    });
    navigate("/movieListPage");
  };
  const handleTitleChange = (e: SyntheticEvent) => {
    const titleInput = e.target as HTMLInputElement;
    setTitle(titleInput.value);
  };
  const handleDirectorChange = (e: SyntheticEvent) => {
    const directorInput = e.target as HTMLInputElement;
    setDirector(directorInput.value);
  };
  const handleDurationChange = (e: SyntheticEvent) => {
    const durationInput = e.target as HTMLInputElement;
    setDuration(durationInput.valueAsNumber);
  };
  const handleImageChange = (e: SyntheticEvent) => {
    const imageInput = e.target as HTMLInputElement;
    setImage(imageInput.value);
  };
  const handleDescChange = (e: SyntheticEvent) => {
    const descInput = e.target as HTMLInputElement;
    setDescription(descInput.value);
  };
  const handleBudgetChange = (e: SyntheticEvent) => {
    const budgetInput = e.target as HTMLInputElement;
    setBudget(budgetInput.valueAsNumber);
  };

  return (
    <div
      style={{
        backgroundColor: "#303030",
        border: "1px solid #444",
        borderRadius: "10px",
        padding: "20px",
        width: "fit-content",
        margin: "30px auto",
      }}
    >
      <h3>Ajouter un film</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleTitleChange}
          required
        />
        <br />
        <label htmlFor="director">Director</label>
        <input
          type="text"
          id="director"
          name="director"
          onChange={handleDirectorChange}
          required
        />
        <br />
        <label htmlFor="duration">Duration</label>
        <input
          type="number"
          id="duration"
          name="duration"
          onChange={handleDurationChange}
          required
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleDescChange}
        />
        <br />
        <label htmlFor="budget">Budget</label>
        <input
          type="number"
          id="budget"
          name="budget"
          onChange={handleBudgetChange}
        />
        <br />
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate("/movieListPage")}>
          Annuler
        </button>
      </form>
    </div>
  );
};

export default EditMoviePage;
