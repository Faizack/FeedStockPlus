import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import Eye icons
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SideLogo from "../components/SideLogo";
import { useLoginMutation } from "../redux/api/userAPI";
import { setUserAndToken } from "../redux/reducer/userReducer";
import { LoginResponse, MessageResponse } from "../types/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Login, { isLoading }] = useLoginMutation();
  const navigator=useNavigate()
  const dispatch=useDispatch()


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password, isLoading);
    const res = await Login({ email, password });

    if ("data" in res) {
      const message = (res.data as LoginResponse).message || "";
      toast.success(message);
      dispatch(setUserAndToken({user:res.data.data.user,token:res.data.data.token}))
      navigator("/user/home")
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message || "";
      toast.error(message);
    }
  };

  return (
    <div className="login">
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
          <br />
          <button type="submit">Login</button>
          {/* <button>Login with Google</button>  */}
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
