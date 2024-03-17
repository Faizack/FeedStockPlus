import toast from "react-hot-toast";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
      <h1>Feedstock+ Source</h1>

      <nav>
            <Link to="/user/profile"><FaRegCircleUser color="#6D6D6D"/></Link>
            <Link to="/user/notification"><IoNotifications color="#FFD700"  /></Link>
            <Link to="/login" onClick={()=>toast.success("LogOut Successfully")}><HiOutlineLogout color="#6D6D6D"/></Link>

      </nav>
    </div>
  )
}

export default Header