import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Logo from "../components/logo";

const Afterlogin = () => {
  const navigate = useNavigate();


  return (
    <div className="inventory">
      <aside>
        <Logo />
      </aside>
      <div className="head-content">
        <Header />
        <h1>Try RED Chat</h1>
        <br />

      </div>
      <div>
      <button onClick={()=>navigate("/user/chat")} id="btn-chat">Chat Link</button>
        <button onClick={()=>navigate("/user/dashboard")} id="btn-chat">DashBoard</button>
      </div>

    </div>
  );
};

export default Afterlogin;
