import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Logo from "../components/logo";

const Afterlogin = () => {
  const navigate = useNavigate();

  function handleChatClick() {
    navigate("/user/chat");
  }

  return (
    <div className="inventory">
      <aside>
        <Logo />
      </aside>
      <div className="head-content">
        <Header />
        <h1>Try RED Chat</h1>
        <br />
        <button onClick={handleChatClick} id="btn-chat">Chat Link</button>
      </div>
    </div>
  );
};

export default Afterlogin;
