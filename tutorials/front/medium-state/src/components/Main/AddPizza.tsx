import { SyntheticEvent, useState } from "react";
import { NewPizza } from "../../types";

interface AddPizzaProps {
  addPizza: (pizza: NewPizza) => void;
}

const AddPizza = ({ addPizza }: AddPizzaProps) => {
  const [pizza, setPizza] = useState("");
  const [description, setDescription] = useState("");

  const handlePizzaChange = (e: SyntheticEvent) => {
    const pizzaInput = e.target as HTMLInputElement;
    console.log("change in pizzaInput:", pizzaInput.value);
    setPizza(pizzaInput.value);
  };

  const handleDescriptionChange = (e: SyntheticEvent) => {
    const descriptionInput = e.target as HTMLInputElement;
    console.log("change in descriptionInput: ", descriptionInput.value);
    setDescription(descriptionInput.value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log("submit:", pizza, description);
    addPizza({ title: pizza, content: description });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pizza">Pizza</label>
        <br />
        <input
          type="text"
          id="pizza"
          name="pizza"
          onChange={handlePizzaChange}
          required
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleDescriptionChange}
          required
        />
        <br />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddPizza;
