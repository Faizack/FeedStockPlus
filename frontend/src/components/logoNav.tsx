import { FaExchangeAlt, FaLaptopHouse } from "react-icons/fa";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { IoIosList } from "react-icons/io";
import { MdChecklist, MdOutlineInventory } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import { Link } from "react-router-dom";

const LogoNav = () => {
  return (
    <nav className="logoNav">
      <Link to={"/"}>
        <HiOutlineViewGridAdd size={20} /> Overview
      </Link>
      <Link to={"/user/dashboard"}>
        <FaLaptopHouse size={20} /> Source
      </Link>
      <Link to={"/"}>
        <SiGooglemaps size={20} /> Map View
      </Link>
      <Link to={"/"}>
        <IoIosList size={20} /> Subsubtain
      </Link>
      <Link to={"/auditor/trust"}>
        <MdChecklist size={20} /> Contracts
      </Link>

      <Link to={"/user/inventory"}>
        <MdOutlineInventory size={20} /> Inventory
      </Link>

      <Link to={"/"}>
        <FaExchangeAlt size={20} /> Trasaction
      </Link>
    </nav>
  );
};

export default LogoNav;
