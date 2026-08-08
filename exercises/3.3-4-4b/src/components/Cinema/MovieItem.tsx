import { useState } from "react";

interface MovieItemProps {
  title: string;
  director: string;
  description: string;
}

const MovieItem = ({ title, director, description }: MovieItemProps) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <tr onClick={() => setShowDescription(!showDescription)}>
      <td>{title}</td>
      <td>{director}</td>
      <td>{showDescription && <p>{description}</p>}</td>
    </tr>
  );
};

export default MovieItem;
