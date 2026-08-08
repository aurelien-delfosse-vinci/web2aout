import { useNavigate, useOutletContext } from "react-router-dom";
import { PizzeriaContext } from "../../types";
import { SyntheticEvent, useState } from "react";

const LoginPage = () => {
  const { loginUser }: PizzeriaContext = useOutletContext();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      navigate("/");
    } catch (err) {
      console.error("LoginPage::error: ", err);
      throw err;
    }
  };

  const handleUsernameInputChange = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setUsername(input.value);
  };

  const handlePasswordChange = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setPassword(input.value);
  };

  return (
    <div>
      <h1>Connectez vous</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameInputChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          type="text"
          id="password"
          name="password"
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Se Connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;
