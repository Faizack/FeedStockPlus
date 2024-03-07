import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Signup">
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
              {showPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </button>
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" />
               I agree to the Terms & Conditions
            </label>
          </div>
          <br />

          <button>SignUp</button>

        </form>
      </main>
      <div className="create-account">
        <p>
          Already have a FeedstockPlus account?
          <Link to={"/login"}>
            <button className="button"> Login</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
