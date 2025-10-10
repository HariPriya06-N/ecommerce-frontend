import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    // Trim inputs
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setErrorMsg("Both username and password are required.");
      return;
    }

    try {
      const response = await axios.post("https://ecommerce-backend-ax2s.onrender.com/login", {
        username: trimmedUsername,
        password: trimmedPassword,
      });

      const message = response.data;

      if (message.startsWith("Login success") || message.startsWith("New user created successfully")) {
       
        setErrorMsg(""); 
        setUsername(""); 
        setPassword("");
        navigate("/dashboard");
      } else if (message === "Invalid password") {
        setErrorMsg("Invalid credentials. Try again.");
      } else if (message === "User not found") {
        setErrorMsg("User does not exist.");
      } else {
        setErrorMsg(message); 
      }
    } catch (error) {
      console.error("Error during login", error);
      setErrorMsg("Server error. Please try later.");
    }
  };

  return (
    <div className="login-container">
      <fieldset className="login-box">
        <legend className="login-title">LOGIN</legend>
        {errorMsg && <div className="login-error">{errorMsg}</div>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="login-input"
        />
        <button onClick={login} className="login-button">Login</button>
      </fieldset>
    </div>
  );
};

export default Login;
