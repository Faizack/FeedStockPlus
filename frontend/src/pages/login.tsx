import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import Eye icons


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  {
    console.log(email, password);
  }
  return (
    <div className="login">
      <aside>
        <h1>FeedStockPlus</h1>
      </aside>
      <main>
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <br />
          <button>Login</button>
          <button>Login with Google</button>
        </form>
      </main>
      <div className="create-account">
        <p>
          Don't have an account? Create one
          <Link to={"/signup"}>
            <button className="button"> SignUp</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
