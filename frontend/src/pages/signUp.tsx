import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import SideLogo from "../components/SideLogo";
import { useSignupMutation } from "../redux/api/userAPI";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [signup] = useSignupMutation({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);

    const res = await signup({ email, password });
    if ("data" in res) {
      const message = (res.data as MessageResponse).message || "";

      toast.success(message);

    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message || "";
      toast.error(message);
    }
  };

  return (
    <div className="Signup">
      <SideLogo />
      <main>
        <form onSubmit={handleSubmit}>
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
          <div className="checkbox">
            <label>
              <input type="checkbox" />I agree to the Terms & Conditions
            </label>
          </div>
          <br />

          <button type="submit">SignUp</button>
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
