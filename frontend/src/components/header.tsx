import toast from "react-hot-toast";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { resetUser } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    toast.success("Logged out successfully");
    dispatch(resetUser())
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="Header">
      <h1>Feedstock+ Source</h1>

      <nav>
            <Link to="/user/profile"><FaRegCircleUser color="#6D6D6D"/></Link>
            <Link to="/user/notification"><IoNotifications color="#FFD700"  /></Link>
            <Link to="/login" onClick={logOut}><HiOutlineLogout color="#6D6D6D"/></Link>

      </nav>
    </div>
  )
}

export default Header